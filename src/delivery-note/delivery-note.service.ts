import { Injectable, Logger } from '@nestjs/common';
import { CreateDeliveryNoteDto } from './dto/create-delivery-note.dto';
import { UpdateDeliveryNoteDto } from './dto/update-delivery-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DataSource, In, Repository } from 'typeorm';
import { DeliveryNote } from './entities/delivery-note.entity';
import { Product } from './entities/item.entity';
import { DeliveryNoteLine } from './entities/delivery-note-line.entity';
import { Cron } from '@nestjs/schedule';
import { DeliveryNoteGroup } from './dto/delivery-note-group.dto';
import { EbpService } from '../ebp/ebp/ebp.service';
import { Generic } from '../generic/generic.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class DeliveryNoteService {

  constructor(

      private readonly ebpService: EbpService,
      private readonly datasource: DataSource,
      @InjectRepository(DeliveryNote)
      private readonly deliveryNoteRepository: Repository<DeliveryNote>,

      private readonly generic: Generic
  ){}
  private readonly logger = new Logger(DeliveryNoteService.name);
  private enabled = true;
  private running = false;
  private lastRunAt: Date | null;

  create(createDeliveryNoteDto: CreateDeliveryNoteDto) {
    return 'This action adds a new deliveryNote';
  }

  findAll() {
    return `This action returns all deliveryNote`;
  }

  async findOne(id: number): Promise<DeliveryNote | null> {
      return await this.deliveryNoteRepository.findOne({
        where: {id: id}
      });
  }

  update(id: number, updateDeliveryNoteDto: UpdateDeliveryNoteDto) {
    return `This action updates a #${id} deliveryNote`;
  }

  remove(id: number) {
    return `This action removes a #${id} deliveryNote`;
  }

  @Cron('*/2 * * * *')
  async sync(){
      if (!this.enabled || this.running) return;
      this.running = true;

      try {
        this.lastRunAt = new Date();
        const lastUpdate = await this.deliveryNoteRepository
            .createQueryBuilder('n')
            .select('MAX(n.ebpUpdatedAt)', 'max')
            .getRawOne();

        const since = lastUpdate?.max ? new Date(lastUpdate.max) : new Date(0);

        const sql_get_notes = `SELECT TOP 1000
                                sd.Id AS ebpId,
                                sd.DocumentNumber AS number,
                                sd.CustomerId AS customerCode,
                                sd.DocumentDate AS date,
                                sd.sysModifiedDate AS ebpUpdatedAt
                                FROM SaleDocument sd
                                WHERE sd.DocumentType = 2
                                AND sd.sysModifiedDate >= @0
                                ORDER BY sd.sysModifiedDate ASC`;

        const notes = await this.ebpService.query(sql_get_notes, [since]);  
        
        if (!notes.length) return;

        const notesIds = notes.map((note) => note.ebpId);
        const notesIds_params_index = notesIds.map((noteId, index) => `@${index}`).join(',');
        const slq_get_lines = `SELECT 
                                sdl.Id AS ebpId,
                                sdl.DocumentId AS documentId,
                                sdl.ItemId AS productId,
                                sdl.LineType AS lineType,
                                sdl.RealQuantity AS quantity
                                FROM SaleDocumentLine sdl
                                WHERE sdl.DocumentId IN (${notesIds_params_index})
        `;
        const lines = await this.ebpService.query(slq_get_lines, notesIds);

        const itemIds = [...new Set(lines.map((l) => l.productId).filter(Boolean))];

        let items = [];
        if (itemIds?.length > 0) {

              const itemIds_params_index = itemIds.map((item, index) => `@${index}`).join(",");

             const sql_get_items = `
              SELECT 
              i.Id AS ebpId,
              i.Height AS height,
              i.Width AS width,
              i.Length AS length,
              i.Volume AS volume,
              i.VolumeUnitId AS volumeUnitId,
              i.Weight AS weight,
              i.NetWeight AS netWeight,
              i.Caption AS name
              FROM Item i
              WHERE i.Id IN (${itemIds_params_index})
            `;

            items = await this.ebpService.query(sql_get_items, itemIds);
        }
        else{
          items = [];
        }

        await this.datasource.transaction(async (manager) => {

            if (notes.length) {
              await manager.upsert(DeliveryNote, notes, ['ebpId']);
            }

            if (items.length) {
              await manager.upsert(Product, items, ['ebpId']);
            }

            const saved_notes = await manager.find(DeliveryNote, 
              {
                where: { ebpId: In(notesIds)},
                select: ['id', 'ebpId']
              }
            );
            const noteMap = new Map(saved_notes.map((sn) => [sn.ebpId, sn.id]));

            const saved_items = await manager.find(Product, {
              where: { ebpId: In(itemIds)},
              select: ['id', 'ebpId']
            });

            const itemMap = new Map((saved_items.map((si) => [si.ebpId, si.id])));

            const lineEntities = lines.map((line) => ({
                ebpId: line.ebpId,
                productId: line.productId ? itemMap.get(line.productId) ?? null : null,
                lineType: line.lineType,
                quantity: line.quantity,
                deliveryNoteId: noteMap.get(line.documentId)
            }));

            if (lineEntities.length) {
              await manager.upsert(DeliveryNoteLine, lineEntities, ['ebpId']);
            }
        })
       
        
        this.logger.log(`${notes.length} bons synchronisés`);
      } catch (error) {
        this.logger.error('Synchro EBP échouée', (error as Error).stack);
      } finally {
        this.running = false;
      }
  }

  startSync(){
      this.enabled = true;
  }

  stopSync(){
    this.enabled = false;
  }

  syncStatus(){

    return{
      enabled: this.enabled,
      running: this.running,
      lastRunAt: this.lastRunAt
    };
  }


  async getNotesGroupByDate(paginationDto: PaginationDto): Promise<{}>{


      const total = await this.deliveryNoteRepository.createQueryBuilder('n')
        .select('COUNT(DISTINCT CAST(n.delivery_date AS DATE))', 'total')
        .getRawOne();

      const result = await this.deliveryNoteRepository.createQueryBuilder('n')
      .select('CAST(n.delivery_date AS DATE)', 'date')
      .addSelect('COUNT(*)', 'count')
      .groupBy('CAST(n.delivery_date AS DATE)')
      .orderBy('CAST(n.delivery_date AS DATE)', 'DESC')
      .limit(paginationDto.limit)
      .offset(paginationDto.offset)
      .getRawMany();

      const deliveryNotesGroup = result.map((item) => 
          this.generic.transfert(new DeliveryNoteGroup, item)
      )

      return {
          deliveryNotesGroup,
          total,
          limit: paginationDto.limit,
          offset: paginationDto.offset
      };
  }

  async getNotesByDate(day: Date, paginationDto: PaginationDto): Promise<{}>{

      const startDate = new Date(`${day}T00:00:00`);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1); 

      const [deliveryNotes, total] = await this.deliveryNoteRepository.findAndCount({
          where: { deliveryDate: Between(startDate, endDate)},
          order: { deliveryDate: 'ASC'},
          take: paginationDto.offset,
          skip: paginationDto.offset 
      });

      return{
        deliveryNotes,
        total,
        limit: paginationDto.limit,
        offset: paginationDto.offset
      }

  }

}
