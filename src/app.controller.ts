import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MailService } from './common/mail/mail.service';
import { CreateMailDto } from './common/mail/dto/create-mail.dto';
import { Public } from './common/decorators/public.decorator';
import { Generic } from './generic/generic.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Repository } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailservice: MailService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private generic : Generic

  ) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Post("/send/mail")
  async sendMail(@Body() createMailDto: CreateMailDto){

      return await this.mailservice.sendMail(createMailDto);
     
  }

  @Public()
  @Get("/metadata/uniques")
  async getUniquesColumns(){
     this.generic.throwUniqueConstraint(this.userRepository);
  }
}
