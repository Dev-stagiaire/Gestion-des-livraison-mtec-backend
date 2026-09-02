import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Permission } from 'src/permission/entities/permission.entity';
import { Role } from 'src/role/entities/role.entity';
import { MailService } from 'src/common/mail/mail.service';
import { ResetTokens } from 'src/reset_tokens/entities/reset-tokens.entity';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Generic } from 'src/generic/generic.service';
import { RoleService } from 'src/role/role.service';
import { PermissionService } from 'src/permission/permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Permission, ResetTokens])],
  controllers: [UserController],
  providers: [UserService, MailService, Generic, RoleService, PermissionService],
  exports: [TypeOrmModule, UserService]
})
export class UserModule {}
