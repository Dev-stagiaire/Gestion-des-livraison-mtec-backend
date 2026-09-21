import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Generic } from 'src/generic/generic.service';

@Module({
  imports:[TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [CustomerService, Generic],
  exports: [TypeOrmModule]
})
export class CustomerModule {}
