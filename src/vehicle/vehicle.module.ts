import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { ConfigModule } from '@nestjs/config';
import { Generic } from '../generic/generic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicule.entity';
import { CommonService } from '../common/common.service';
import { Configuration } from '../common/entities/configuration.entity';

@Module({
  imports: [ 
    HttpModule.register({
      baseURL: process.env.ENDPOINT_VEHICLE,
      headers: {
        'Content-Type': 'application/json',
      },  
      timeout: 5000,
      maxRedirects: 5,
    }),
    ConfigModule,
    TypeOrmModule.forFeature([Vehicle, Configuration])
  ],
  controllers: [VehicleController],
  providers: [VehicleService, Generic, CommonService],
  exports: [TypeOrmModule]
})
export class VehicleModule {}
