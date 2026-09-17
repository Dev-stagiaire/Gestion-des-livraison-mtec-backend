import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ 
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ConfigModule
  ],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
