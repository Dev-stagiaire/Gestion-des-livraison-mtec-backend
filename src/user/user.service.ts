import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidateUserDto } from './dto/validate-user.dto';
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/common/mail/mail.service';
import { ResetTokens } from 'src/reset_tokens/entities/reset-tokens.entity';
import { Generic } from 'src/generic/generic.service';
import { RoleService } from 'src/role/role.service';
import { SentMessageInfo } from 'nodemailer';
import { MatchOtpResponse } from 'src/common/interfaces/match-otp-response.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { CreateMailDto } from 'src/common/mail/dto/create-mail.dto';
import { QueryDto } from 'src/common/dto/query.dto';
import { UserResponseDto } from 'src/auth/dto/user-response.dto';
import { ActiveUserAccountDto } from './dto/active-user-account.dto';

@Injectable()
export class UserService {

  constructor(

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @InjectRepository(ResetTokens)
    private resetTokensRepository: Repository<ResetTokens>,

    private readonly mailService: MailService,

    private readonly generic: Generic,

    private readonly roleService: RoleService,

  ){};

  async create(createUserDto: CreateUserDto): Promise<SentMessageInfo>{

      try {

          const user_exist = await this.userRepository.findOne({
              where: { email: createUserDto.email}
          });
          if (user_exist) {
            throw new ConflictException('Email already exists');
          }

          let user = new User();
          user = this.generic.transfert(user, createUserDto);
          user.password = await this.generic.hasher(process.env.JWT_SECRET || "testkjasldfhbsclawhejfgjsbclawhfjkbedc");
          if (createUserDto.role_id) {
              const role = await this.roleService.findById(createUserDto.role_id);
              user.role = role;
          }
          user.is_active = false;

          const user_saved = await this.userRepository.save(user);
          const url = process.env.BASE_URL + `/activate-user-account?token=`

          return this.SendVerificationLink(user_saved.id, "item", "Activate_account", url,  user_saved.email);
        
      } catch (error) {
          Logger.error(error);
          throw error;
      }
  }

  async resendToken(id: number, raison: string){
    const user = await this.findById(id);
    if (!user) {
      throw new ConflictException('User not found');
    }
    const url = process.env.BASE_URL + `/activate-user-account?token=`;
    this.SendVerificationLink(id, "", raison, url, user.email);
  }

  async validateUser(user_id: number,validateUserDto: ValidateUserDto): Promise<SentMessageInfo>{

      const role = await this.roleService.findById(validateUserDto.role_id);
      const user = await this.findById(user_id);
      const subject = "Compte validé";
      const template = "validation-user";
      const context= {
        username: user?.first_name,   
      }
      if (role && user) {
            user.is_active= true;
            user.role= role ?? null;
            const createMailDto = new CreateMailDto();
            createMailDto.sendTo = user.email;
            createMailDto.subject = subject;
            createMailDto.template = template;
            createMailDto.context = context;
            this.userRepository.save(user);
            return this.mailService.sendMail(createMailDto);
      }
      else{
        throw new NotFoundException();
      }
  }

  async findByEmail(email: string): Promise<User | null>{
    
    console.log(email);
    return await this.userRepository.findOne({
        where: {email: email},
    });
  }

  async findById(id: number): Promise<User | null>{
    try {
      return await this.userRepository.findOne({
        where: {id: id},
        relations: {role:{}}
      });
      
    } catch (error) {
      throw new NotFoundException("Utilisateur introuvable");
    }
  }

  async filterUser(filterUserDto: FilterUserDto): Promise<{}>{
      
      const filter_clause_where: FindOptionsWhere<User> = {};
      const keys = Object.keys(filterUserDto) ; 
      let i = 0;
      for(const key of keys){
          if (Object.values(filterUserDto)[i]) {
            filter_clause_where[key] = Object.values(filterUserDto)[i]; 
          }
          i++;
      }
      if (filterUserDto.role) {
        const role = await this.roleService.findByName(filterUserDto.role);
       
        if (role) {
            const clause = { id: role.id};
            filter_clause_where['role'] = clause;  
        }
      }
      return filter_clause_where;
        // return await this.generic.genericSearch(role.id.toString(), paginationDto, this.userRepository, relations, keys as (keyof User)[])
  } 

  async findAll(queryDto: QueryDto): Promise<{}> {

    const filterUserDto = new FilterUserDto();
    filterUserDto.role = queryDto.role;
    filterUserDto.is_active = queryDto.is_active;
    let filter_where_clause = {}
    if (queryDto.role || queryDto.is_active) {
      filter_where_clause = await this.filterUser(filterUserDto);
    }

      // console.dir(filter_where_clause);
      const [users, total] = await this.userRepository.findAndCount({
          relations: {
            role: {
              permissions: true,
            }
          },
          where: filter_where_clause,
          take: queryDto.limit,
          skip: queryDto.offset, 
      });
      const results = users.map((user) => {
          let userResponseDto = new UserResponseDto();
          return this.generic.transfert(userResponseDto, user);
      });
      return {
        data: results,
        count: total,
      };
  }

  async search(queryDto: QueryDto): Promise<{}>{

    const filterUserDto = new FilterUserDto();
    filterUserDto.role= queryDto.role;
    filterUserDto.is_active= queryDto.is_active;
    const paginationDto = new PaginationDto();
    paginationDto.limit= queryDto.limit;
    paginationDto.offset= queryDto.offset;

    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const number_phone_regex = /^03+[23478][0-9]{7}$/;
    const relations = {
       role:{
         permissions: true
       },
    } as FindOptionsRelations<User>;
    let keys: (keyof User)[] = [];

    if (email_regex.test(queryDto.search_term)) {
        console.log("email");
        keys = ["email"];
    }
    else if (number_phone_regex.test(queryDto.search_term)) {
        console.log("phone");
        keys = ["phone"];
    }
    else{
      console.log("name");
      keys = ["first_name", "last_name", "email"];
    }
 
    const filter_where_clause = await this.filterUser(filterUserDto);
    return await this.generic.genericSearch(queryDto.search_term, paginationDto, this.userRepository, relations, keys, filter_where_clause);

  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
      let user: User | null = await this.findById(id);
      if (!user) {
          throw new NotFoundException("Utilisateur introuvable"); 
      } 
      if (updateUserDto.role_id) {
          const role = await this.roleService.findById(updateUserDto.role_id);
          user = this.generic.transfert(user, updateUserDto);
          user.role = role;
          console.dir(user);
  
      }
      return this.userRepository.save(user); 
  }

  async remove(id: number) {

      const user = await this.findById(id);
      if (!user) {
        return false;
      }
      user.is_deleted= true;
      await this.userRepository.save(user);
  }

  async findUserResetTokens(user: User, raison: string): Promise<ResetTokens | null>{

    return await this.resetTokensRepository.findOne({
        where: {
          user: { id: user.id},
          context: raison 
        },
        relations: {
          user: true
        }
    })
    
  }

   async findUserResetTokensByToken(token: string, raison: string): Promise<ResetTokens | null>{

    return await this.resetTokensRepository.findOne({
        where: {
          hash_token: token,
          context: raison 
        },
        relations: {
          user: true
        }
    })
    
  }

  async SendVerificationLink(id: number,item: string, raison: string, url: string, send_to?: string): Promise<SentMessageInfo>{
    
      let user: User | null = await this.findById(id);
      if (!user) {
          throw new NotFoundException("Utilisateur introuvable");
      }
      if(!send_to){
        send_to = user.email;
      }

      const otp = this.generic.generateOtp();
      const reset_tokens =  new ResetTokens();
      reset_tokens.created_at = new Date();
      reset_tokens.user = user;
      reset_tokens.expired_at = new Date(Date.now() + 300 * 1000);
      reset_tokens.hash_token = await this.generic.hasher(otp);
      reset_tokens.context= raison;
      reset_tokens.item= item;

      const last_reset_tokens = await this.findUserResetTokens(user, raison);
      if (!last_reset_tokens) {
        const saved_token = this.resetTokensRepository.save(reset_tokens); 
        if (!saved_token) {
          throw new InternalServerErrorException("Erreur lors de l'enregistrement");;
        }
        else{
          url = url + (await saved_token).hash_token;
        }
      }
      else{
        if (last_reset_tokens.expired_at.getTime() < Date.now()) {
            await this.resetTokensRepository.manager.transaction(async (manager) => {
                await manager.save(reset_tokens);
                await manager.delete(this.resetTokensRepository.target, last_reset_tokens.id);
            })
            url = url + reset_tokens.hash_token;
            Logger.log("Token created");
        }
      }
     
      let subject = "";
      let template = "";
      let context= {};
      
      switch(raison){
        case "change_mail":
          subject = "Confirmation du changement d'adresse e-mail";
          template = "confirmation-email";     
          context= {
              username: user.first_name,
              confirmation_url: url,
          };
        break;
        case "change_password":
          subject = "Réinitialisation du mot de passe";
          template = "reset-password";
          context= {
              username: user.first_name,
              reset_url: url,
          };
        case "Activate_account":
          template = "activate-user";
          subject = "Activez votre compte";
          context = {
              username: user.first_name,
              activationUrl: url,
          }
        break;

        default:
          throw new Error("Unknown raison !");
      }

      
      const createMailDto = new CreateMailDto();
      createMailDto.sendTo = send_to;
      createMailDto.subject = subject;
      createMailDto.template = template;
      createMailDto.context = context;
      console.dir(createMailDto, { depth: null });

      return this.mailService.sendMail(createMailDto);
      
      
  }


  async macthOtp(otp_token: string, raison: string): Promise<MatchOtpResponse>{
   
      const user_tokens = await this.findUserResetTokensByToken(otp_token, raison);
      if (!user_tokens) {
          throw new NotFoundException("Aucun token");
      }

      if ( otp_token === user_tokens?.hash_token && user_tokens?.expired_at) {
          
        const isExpired = user_tokens?.expired_at.getTime() > Date.now();

        if (isExpired) {
            return {
                user_tokens_id: user_tokens.id,
                valid: true,
                item: user_tokens.item,
            }; 
        }
        else{
            throw new Error("Token expired");
        }
      }
      else{
           return {
                user_tokens_id: null,
                valid: false,
                item: user_tokens.item,
            }; 
      }
  }

  async changePassword(id: number, otp_token: string){

      let user: User | null = await this.findById(id);
      if (!user) {
          throw new NotFoundException("Utilisateur introuvable");
      }

      const otp_value = await this.macthOtp(otp_token, "change_password");

      if (otp_value.valid) {

          await this.resetTokensRepository.manager.transaction(async (manager) => {
              user.password = await this.generic.hasher(otp_value.item);
              user.password_changed_at = new Date();
              await manager.save(user);
              await manager.delete(this.resetTokensRepository.target, otp_value.user_tokens_id);
          })
            
      }else{
          throw new NotFoundException("Token not found");
      }
  }

  async changeMail(id: number, otp_token: string){

    let user: User | null = await this.findById(id);
    if (!user) {
        throw new NotFoundException("Utilisateur introuvable");
    }

    const otp_value = await this.macthOtp(otp_token, "change_mail");
    if (otp_value.valid) {

        const user_exist = await this.userRepository.findOne({
            where: { email: otp_value.item}
        });

        if (user_exist) {
            throw new ConflictException("Un utilisateur possède déjà cette adresse e-mail.") 
        }

        await this.resetTokensRepository.manager.transaction(async (manager) => {
            user.email = otp_value.item;
            await manager.save(user);
            await manager.delete(this.resetTokensRepository.target, otp_value.user_tokens_id);
        })
    }
    else{
        throw new NotFoundException("Token not found");
    }
  }

  async activateUserAccount(token: string, activateUserAccoutDto: ActiveUserAccountDto): Promise<boolean>{
      
      const otp_value = await this.macthOtp(token, "Activate_account");
      console.dir(otp_value);
      if (otp_value.valid) {

          const user_exist = await this.findById(otp_value.user_tokens_id || 0);

          await this.resetTokensRepository.manager.transaction(async (manager) => {
            console.dir(user_exist)
              if (user_exist) {
                  if (activateUserAccoutDto.password1 === activateUserAccoutDto.password2) {
                      user_exist.password = await this.generic.hasher(activateUserAccoutDto.password1);
                      user_exist.is_active= true;
                      await manager.save(user_exist);
                      await manager.delete(this.resetTokensRepository.target, otp_value.user_tokens_id);
                  }
                  else{
                    throw new BadRequestException("Passwords not match");
                  }
              }
              else{
                throw new NotFoundException("User not found !");
              }
          })
          return true;
      }
      else{
          throw new NotFoundException("Token not found");
      }
  }


}
