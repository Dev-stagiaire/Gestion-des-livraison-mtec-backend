import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Observable } from 'rxjs';
import { Vehicle } from './entities/vehicule.entity';
import { AxiosResponse } from 'axios';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiDto } from './dto/api.dto';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @Public()
  @Get("/all")
  findAll(@Body() apiDto: ApiDto): Promise<Observable<AxiosResponse<Vehicle[]>>> {
    return this.vehicleService.getData(apiDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehicleService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(+id);
  }
}
