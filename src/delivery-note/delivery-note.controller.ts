import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeliveryNoteService } from './delivery-note.service';
import { CreateDeliveryNoteDto } from './dto/create-delivery-note.dto';
import { UpdateDeliveryNoteDto } from './dto/update-delivery-note.dto';

@Controller('delivery-note')
export class DeliveryNoteController {
  constructor(private readonly deliveryNoteService: DeliveryNoteService) {}

  @Post()
  create(@Body() createDeliveryNoteDto: CreateDeliveryNoteDto) {
    return this.deliveryNoteService.create(createDeliveryNoteDto);
  }

  @Get()
  findAll() {
    return this.deliveryNoteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryNoteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeliveryNoteDto: UpdateDeliveryNoteDto) {
    return this.deliveryNoteService.update(+id, updateDeliveryNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryNoteService.remove(+id);
  }
}
