import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthorizedRoles } from 'src/common/decorators/roles.decorator';
import { RequiredPermission } from 'src/common/decorators/required.permission.decorator';
import { ChangeEmailDto } from './dto/change-email.dto';
import { ChangePasswordUserDto } from './dto/change-password-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ValidateUserDto } from './dto/validate-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { CreateMailDto } from 'src/common/mail/dto/create-mail.dto';
import { MailService } from 'src/common/mail/mail.service';
import { QueryDto } from 'src/common/dto/query.dto';
import { ActiveUserAccountDto } from './dto/active-user-account.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService,
    private mailService: MailService,
  ) {}

  @Public()
  @Post("/create")
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @AuthorizedRoles("ADMIN")
  @Post("/validate/:id")
  async validateUser(@Param('id', ParseIntPipe) id: number, @Body() validateUserDto: ValidateUserDto) {
    return await this.userService.validateUser(id, validateUserDto);
  }

  @RequiredPermission("READ_USER")
  @Get("/find/all")
  async findAll(@Query() queryDto: QueryDto) {
    return await this.userService.findAll(queryDto);
  }

  @RequiredPermission("READ_USER")
  @Get("/find/search")
  async search(@Query() queryDto: QueryDto) {
    return await this.userService.search(queryDto);
  }

  @RequiredPermission("READ_USER")
  @Get('/find/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findById(+id);
  }

  @RequiredPermission("READ_USER")
  @Get('/find')
  async findByEmail(@Query('email') email: string) {
    return await this.userService.findByEmail(email);
  }

  @RequiredPermission("UPDATE_USER")
  @Patch('/update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @AuthorizedRoles("ADMIN")
  @Delete('/delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.remove(+id);
  }

  @RequiredPermission("UPDATE_USER")
  @Patch('/change/email/sendLink/:id')
  async changeEmailLink(@Param('id', ParseIntPipe) id: number, @Body() changeEmailDto: ChangeEmailDto){
      const url = 'http://localhost:3000/user/change/email/'+ id +'?token=';
      return this.userService.SendVerificationLink(id, changeEmailDto.new_email, "change_mail", url,  changeEmailDto.new_email);
  }

  @Public()
  @Get('/change/email/:id')
  async changeMail(@Param('id', ParseIntPipe) id: number,@Query('token') token: string){
    return this.userService.changeMail(id, token);
  }

  @RequiredPermission("UPDATE_USER")
  @Patch('/change/password/sendLink/:id')
  async changePasswordLink(@Param('id', ParseIntPipe) id: number,@Body() changePasswordUserDto: ChangePasswordUserDto){
      const url = 'http://localhost:3000/user/change/password/'+ id +'?token=';
      return this.userService.SendVerificationLink(id,changePasswordUserDto.new_password, "change_password", url);
  }

  @Public()
  @Get('/change/password/:id')
  async changePassword(@Param('id', ParseIntPipe) id: number,@Query('token') token: string){
    return this.userService.changePassword(id, token);
  }

  @Public()
  @Post("/active/account/:id")
  async activateAccount(@Param('id', ParseIntPipe ) id: number,@Query('token') token: string, @Body() activeUserAccountDto: ActiveUserAccountDto){
      this.userService.activateUserAccount(id, token, activeUserAccountDto);
  }


}

