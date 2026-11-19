import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Permission } from '../permission/entities/permission.entity';
import { Role } from '../role/entities/role.entity';
import { MailService } from '../common/mail/mail.service';
import { ResetTokens } from '../reset_tokens/entities/reset-tokens.entity';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Generic } from '../generic/generic.service';
import { RoleService } from '../role/role.service';
import { PermissionService } from '../permission/permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Permission, ResetTokens])],
  controllers: [UserController],
  providers: [UserService, MailService, Generic, RoleService, PermissionService],
  exports: [TypeOrmModule, UserService]
})
export class UserModule {}
