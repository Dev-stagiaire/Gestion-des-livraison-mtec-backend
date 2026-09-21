import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Generic } from 'src/generic/generic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicule.entity';

@Module({
  imports: [ 
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ConfigModule,
    TypeOrmModule.forFeature([Vehicle])
  ],
  controllers: [VehicleController],
  providers: [VehicleService, Generic],
})
export class VehicleModule {}
