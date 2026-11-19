
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { MailService } from '../common/mail/mail.service';
import { Generic } from '../generic/generic.service';
import { RoleService } from '../role/role.service';
import { PermissionService } from '../permission/permission.service';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRE') as any,
        },
      }),
    }),
  ],
  providers: [AuthService, UserService, RoleService, MailService, Generic, PermissionService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
