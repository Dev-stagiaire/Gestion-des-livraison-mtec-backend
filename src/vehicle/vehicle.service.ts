import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { Vehicle } from './entities/vehicule.entity';
import { AxiosError } from 'axios';
import { FindOptionsRelations, MoreThan, Repository } from 'typeorm';
import { ApiDto } from './dto/api.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Generic } from '../generic/generic.service';
import { ParseDataDto } from './dto/parse-data.dto';
import { QueryDto } from '../common/dto/query.dto';
import { CommonService } from '../common/common.service';

@Injectable()
export class VehicleService {

  constructor(
    private readonly httpService: HttpService,

    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,

    private readonly generic: Generic,

    private readonly commonService: CommonService
  ) {}

  private logger = new Logger(VehicleService.name);

  create(createVehicleDto: CreateVehicleDto) {
    return 'This action adds a new vehicule';
  }

  async getData(): Promise<any> {

      const mtecParameters = [
        "MTEC_ENDPOINT",
        "MTEC_API",
        "MTEC_COMMAND",
        "MTEC_KEY"
      ]

      const [endpoint, api, command, key] = await Promise.all(
            mtecParameters.map((name) => this.commonService.getConfig(name)) 
      );

      const response = await firstValueFrom(
          this.httpService.get(endpoint, 
            {
              params: {
                api: api,
                key: key,
                cmd: command,
              },
            }
          ).pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.message);
              throw 'An error happened!';
            })
          )
      );

      return response.data;
  }

  async parseData(parseDataDto: ParseDataDto): Promise<Vehicle[]>{

    const apiDto = new ApiDto();
    apiDto.endpoint = parseDataDto.endpoint;
    apiDto.api = parseDataDto.api;
    apiDto.command = parseDataDto.command;
    apiDto.key = parseDataDto.key;

    const filter = await this.commonService.getConfig("MTEC_FILTER");

    const data  = await this.getData();

    const item = data.find((item) => {
      return  item?.email === filter.trim();   
    });


    if (!item) {
        throw new NotFoundException(
            `Customer ${parseDataDto.customer_email} not found`
        );
    }
    const vehicles = this.generic.mapToEntites(item.objects, Vehicle);
    return vehicles;
  }

  async saveVehicles(parseDataDto: ParseDataDto): Promise<Vehicle[]>{
      const vehicles = await this.parseData(parseDataDto);
      return await this.vehicleRepository.save(vehicles);
  }

  async findAll(queryDto: QueryDto): Promise<{}>{
      return await this.generic.genericFindAll(queryDto, this.vehicleRepository);
  }

  async findOne(id: number) {
      return await this.vehicleRepository.findOne({ where: {id: id} });
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicule`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicule`;
  }
}
