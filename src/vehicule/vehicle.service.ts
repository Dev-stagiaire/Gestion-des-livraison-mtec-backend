import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { Vehicle } from './entities/vehicule.entity';
import { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VehicleService {

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  private logger = new Logger(VehicleService.name);

  create(createVehicleDto: CreateVehicleDto) {
    return 'This action adds a new vehicule';
  }

  // async findAll(url: string): Observable<AxiosResponse<Vehicle[]>> {
  async findAll(url: string): Promise<Vehicle[]> {

    console.log(JSON.stringify(url));
    const apiKey = this.configService.get<string>('API_KEY');

    const { data } = await firstValueFrom(
        this.httpService.get(url, 
          {
            params: {
              api: 'server',
              key: '999517619688722681955019C86A17AD',
              cmd: 'GET_USERS_OBJECTS',
            },
          }
        ).pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.message);
            throw 'An error happened!';
          })
        )
    );
    return data;
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
