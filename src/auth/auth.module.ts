
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/common/mail/mail.service';
import { Generic } from 'src/generic/generic.service';
import { RoleService } from 'src/role/role.service';
import { PermissionService } from 'src/permission/permission.service';

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
