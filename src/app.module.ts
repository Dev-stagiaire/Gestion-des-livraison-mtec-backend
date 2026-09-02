import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { MailModule } from './common/mail/mail.module';
import { PdfModule } from './common/pdf/pdf.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter';
import { MailService } from './common/mail/mail.service';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './auth/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PermissionsGuard } from './auth/guards/permissions.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { join } from 'path';
import strict from 'assert/strict';
import { Generic } from './generic/generic.service';

@Module({
  imports: [AuthModule, UserModule, UserModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.BD_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DATABASE || 'glivraison',
      synchronize: true, // Set to false in production to prevent data loss!
      autoLoadEntities: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, "common/mail/templates"),
        adapter: new HandlebarsAdapter(),
        options:{
          strict: true,
        }
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RoleModule,
    PermissionModule,
    MailModule,
    PdfModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService,Generic,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
