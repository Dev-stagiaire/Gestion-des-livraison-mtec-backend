import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';

@Injectable()
export class AppService {

  getHello(): string {
    const otp = randomInt(10000,90000)
    return 'Dà jià hao M-TEC!' + otp;
  }
  
}
