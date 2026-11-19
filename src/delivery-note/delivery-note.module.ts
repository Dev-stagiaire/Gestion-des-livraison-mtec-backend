import { Module } from '@nestjs/common';
import { DeliveryNoteService } from './delivery-note.service';
import { DeliveryNoteController } from './delivery-note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryNote } from './entities/delivery-note.entity';
import { DeliveryNoteLine } from './entities/delivery-note-line.entity';
import { DataSource } from 'typeorm';
import { Generic } from '../generic/generic.service';
import { EbpService } from '../ebp/ebp/ebp.service';
import { Product } from './entities/item.entity';
import { CommonService } from '../common/common.service';
import { Configuration } from '../common/entities/configuration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryNote, DeliveryNoteLine, Product, Configuration])],
  controllers: [DeliveryNoteController],
  providers: [DeliveryNoteService, Generic, EbpService, CommonService],
  exports: [TypeOrmModule]
})
export class DeliveryNoteModule {}
