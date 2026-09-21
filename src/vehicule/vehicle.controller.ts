import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Observable } from 'rxjs';
import { Vehicle } from './entities/vehicule.entity';
import { AxiosResponse } from 'axios';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiDto } from './dto/api.dto';
import { ParseDataDto } from './dto/parse-data.dto';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @Public()
  @Get("/api/data")
  async getApiData(@Body() apiDto: ApiDto): Promise<AxiosResponse<any>> {
    return await this.vehicleService.getData(apiDto);
  }

  @Public()
  @Get("/parse/data")
  async parseData(@Body() parseDataDto: ParseDataDto): Promise<Vehicle[]> {
    return await this.vehicleService.parseData(parseDataDto);
  }

  @Public()
  @Post("retrieve/save/vehicles")
  async retrieveSaveVehicles(@Body() parseDataDto: ParseDataDto): Promise<Vehicle[]> {
    return await this.vehicleService.saveVehicles(parseDataDto);
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
