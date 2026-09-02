import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, Repository } from 'typeorm';
import { retry } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Generic } from 'src/generic/generic.service';

@Injectable()
export class PermissionService {

  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    private readonly generic: Generic,
  ){}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    let permission = new Permission();
    permission = this.generic.transfert(permission, createPermissionDto);
    return await this.permissionRepository.save(permission);
  }

  async findAll(paginationDto: PaginationDto): Promise<{}> {
      const relations = {
        roles : true,
      } as FindOptionsRelations<Permission>;
      return await this.generic.genericFindAll(paginationDto, this.permissionRepository, relations);
  }

  async findById(id: number): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({ 
      where: { id }
    });

    if (!permission) {
      throw new NotFoundException("Permission not found");
    }

    return permission;
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    let permission = await this.findById(id);
    if (!permission) {
        throw NotFoundException;
    }
    permission = this.generic.transfert(permission, updatePermissionDto);
    return this.permissionRepository.save(permission);
  }

  async remove(id: number): Promise<boolean> {
    const permission = await this.findById(id);
    if (!permission) {
        return false;
        throw NotFoundException;
    }
    permission.is_deleted= true;
    this.permissionRepository.save(permission);
    return true;
  }
}
