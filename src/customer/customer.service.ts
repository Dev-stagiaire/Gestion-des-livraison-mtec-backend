import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { Generic } from 'src/generic/generic.service';

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly generic: Generic
  ){}

  async save(customer: Customer): Promise<Customer>{
    try {
        return await this.customerRepository.save(customer);
    } catch (error) {

        if (error instanceof QueryFailedError) {
            throw new BadRequestException(
                'Unable to save customer'
            );
        }

        throw error;
    }
    
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = new Customer()
    this.generic.transfert(customer, createCustomerDto);
    return await this.customerRepository.save(customer);
  }

  findAll() {
    return `This action returns all customer`;
  }

  async findOne(id: number): Promise<Customer | null > {
    return await this.customerRepository.findOne({ where: {id: id}});
  }

  async findByEmail(email: string): Promise<Customer | null>{
    return await this.customerRepository.findOne({ where: {email: email}});
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findOne(id);
    if (!customer) {
      throw new NotFoundException("Customer not found");
    }
    this.generic.transfert(customer, updateCustomerDto);
    return this.customerRepository.save(customer);
  }

  async remove(id: number): Promise<boolean> {
    const customer = await this.findOne(id);
    if (!customer) {
      throw new NotFoundException("Customer not found");
    }
    customer.is_deleted= true;
    this.customerRepository.save(customer);
    return true;
  }
}
