import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Generic } from 'src/generic/generic.service';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class AuthService {

    constructor( 
        private readonly userService: UserService,
        private jwtService: JwtService,
        private generic: Generic,
    ){};

    async login(email: string,password: string): Promise<{ access_token: string, user: UserResponseDto}>{

      try{
        let user_logedin: User | null = await this.userService.findByEmail(email);
        if (user_logedin) {
            if (await this.generic.validatePassword(password, user_logedin.password)) {
                const payload = { sub: user_logedin.id, username: user_logedin.first_name};
                let userResponseDto = new UserResponseDto();
                userResponseDto = this.generic.transfert(userResponseDto, user_logedin);
                return { access_token: await this.jwtService.signAsync(payload), user: userResponseDto };
            }
            else{
              throw new UnauthorizedException();
            }
        }
        else{
          throw new NotFoundException("Utilisateur introuvable");
        }
      }
      catch(error){
        throw error;
      }
    }


    async getMe(user_id: number): Promise<UserResponseDto>{

        const user_logedin  = await this.userService.findById(user_id);
        if (!user_logedin) {
            throw new NotFoundException("User not found");
        }
        let userResponseDto = new UserResponseDto();
        userResponseDto = this.generic.transfert(userResponseDto, user_logedin);
        console.log(userResponseDto);
        return userResponseDto;
    }
}
