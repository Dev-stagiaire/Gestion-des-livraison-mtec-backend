import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { Vehicle } from './entities/vehicule.entity';
import { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';
import { ObjectLiteral, Repository } from 'typeorm';
import { ApiDto } from './dto/api.dto';
import { AxiosResponse } from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Generic } from 'src/generic/generic.service';

@Injectable()
export class VehicleService {

  constructor(
    private readonly httpService: HttpService,

    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,

    private readonly generic: Generic
  ) {}

  private logger = new Logger(VehicleService.name);

  create(createVehicleDto: CreateVehicleDto) {
    return 'This action adds a new vehicule';
  }

  async getData(apiDto: ApiDto): Promise<Observable<AxiosResponse<Vehicle[]>>> {

      const { data } = await firstValueFrom(
          this.httpService.get(apiDto.endpoint, 
            {
              params: {
                api: apiDto.api,
                key: apiDto.key,
                cmd: apiDto.command,
              },
            }
          ).pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.message);
              throw 'An error happened!';
            })
          )
      );
      data.map((item) => {
          this.generic.mapToEntites(item.objects, Vehicle)
      })
      return data;
  }

  async findAll(url: string): Promise<Vehicle[]>{

      return await this.vehicleRepository.find();
  }


  async findByOwner(){

  }

  findOne(id: number) {
    return `This action returns a #${id} vehicule`;
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicule`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicule`;
  }
}
