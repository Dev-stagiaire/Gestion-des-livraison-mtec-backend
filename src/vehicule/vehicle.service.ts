import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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
import { Customer } from 'src/customer/entities/customer.entity';
import { CustomerService } from 'src/customer/customer.service';
import { ParseDataDto } from './dto/parse-data.dto';

@Injectable()
export class VehicleService {

  constructor(
    private readonly httpService: HttpService,

    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,

    private readonly generic: Generic,

    private readonly customerService: CustomerService
  ) {}

  private logger = new Logger(VehicleService.name);

  create(createVehicleDto: CreateVehicleDto) {
    return 'This action adds a new vehicule';
  }

  async getData(apiDto: ApiDto): Promise<any> {

      const response = await firstValueFrom(
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

      return response.data;
  }

  async parseData(parseDataDto: ParseDataDto): Promise<Vehicle[]>{

    const apiDto = new ApiDto();
    apiDto.endpoint = parseDataDto.endpoint;
    apiDto.api = parseDataDto.api;
    apiDto.command = parseDataDto.command;
    apiDto.key = parseDataDto.key;

    const data  = await this.getData(apiDto);

    const item = data.find((item) => {
      return  item?.email === parseDataDto.customer_email.trim();   
    });


    if (!item) {
        throw new NotFoundException(
            `Customer ${parseDataDto.customer_email} not found`
        );
    }
    const customer = this.generic.toEntity(item.info, Customer);
    let exist = await this.customerService.findByEmail(customer?.email);
    if (!exist) {
      exist = await this.customerService.save(customer);
    }
    const result = Object.values(item.objects).map((vehicle: any) => ({
        ...vehicle,
        customer: exist,
    }));
    const vehicles = this.generic.mapToEntites(result, Vehicle);
    return vehicles;
  }

  async saveVehicles(parseDataDto: ParseDataDto): Promise<Vehicle[]>{
      const vehicles = await this.parseData(parseDataDto);
      return await this.vehicleRepository.save(vehicles);
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
