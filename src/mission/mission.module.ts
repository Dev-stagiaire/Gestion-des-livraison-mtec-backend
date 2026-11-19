import { Module } from '@nestjs/common';
import { MissionService } from './mission.service';
import { MissionController } from './mission.controller';
import { Generic } from '../generic/generic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mission } from './entities/mission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mission])],
  controllers: [MissionController],
  providers: [MissionService, Generic],
  exports: [TypeOrmModule]
})
export class MissionModule {}
