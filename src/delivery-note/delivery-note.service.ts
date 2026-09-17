import { Injectable } from '@nestjs/common';
import { CreateDeliveryNoteDto } from './dto/create-delivery-note.dto';
import { UpdateDeliveryNoteDto } from './dto/update-delivery-note.dto';

@Injectable()
export class DeliveryNoteService {
  create(createDeliveryNoteDto: CreateDeliveryNoteDto) {
    return 'This action adds a new deliveryNote';
  }

  findAll() {
    return `This action returns all deliveryNote`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deliveryNote`;
  }

  update(id: number, updateDeliveryNoteDto: UpdateDeliveryNoteDto) {
    return `This action updates a #${id} deliveryNote`;
  }

  remove(id: number) {
    return `This action removes a #${id} deliveryNote`;
  }
}
