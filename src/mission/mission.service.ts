import { Injectable } from '@nestjs/common';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { Repository } from 'typeorm';
import { Mission } from './entities/mission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Generic } from '../generic/generic.service';

@Injectable()
export class MissionService {

  constructor(
      @InjectRepository(Mission)
      private readonly missionRepositry: Repository<Mission>,
      private readonly generic: Generic
  ){}

  create(createMissionDto: CreateMissionDto) {
    return 'This action adds a new mission';
  }

  async findAll(paginationDto: PaginationDto) {
    return await this.generic.genericFindAll(paginationDto, this.missionRepositry);
  }

  findOne(id: number) {
    return `This action returns a #${id} mission`;
  }

  update(id: number, updateMissionDto: UpdateMissionDto) {
    return `This action updates a #${id} mission`;
  }

  remove(id: number) {
    return `This action removes a #${id} mission`;
  }
}
