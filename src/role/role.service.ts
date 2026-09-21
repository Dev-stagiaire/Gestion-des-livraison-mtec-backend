import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { AppService } from 'src/app.service';
import { Generic } from 'src/generic/generic.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Permission } from 'src/permission/entities/permission.entity';
import { PermissionService } from 'src/permission/permission.service';
import { RolePermissionsDto } from './dto/role_permissions.dto';
import { permission } from 'process';

@Injectable()
export class RoleService {

  private readonly logger = new Logger(AppService.name);

  constructor(

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    private permissionService: PermissionService,

    private readonly generic: Generic, 

  ){}

  async activationAccount(createRoleDto: CreateRoleDto){
      
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    let role = new Role();
    role = this.generic.transfert(role, createRoleDto);
    const permissions = await Promise.all(createRoleDto.permission_ids.map((permissionId) => {
      return this.permissionService.findById(permissionId);
    }));
    role.permissions = permissions;
    return await this.roleRepository.save(role);
  }

  async findAll(paginationDto: PaginationDto): Promise<{}> {
    const relations = {
        permissions: true,
    } as FindOptionsRelations<Role>;
    console.log(relations);
     return await this.generic.genericFindAll(paginationDto, this.roleRepository, relations);
  }

  async findById(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations:{
        permissions: true,
      }
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }
   async findByName(name: string): Promise<Role | null> {
    const role = await this.roleRepository.findOne({
      where: { name },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    try {
      let role = await this.findById(id);
      const permissions  = await Promise.all(
          updateRoleDto.permission_ids.map((permissionId) => {
             return this.permissionService.findById(permissionId);
          })
      );
      if (role) {
          role.name = updateRoleDto.name;
          role.permissions = permissions;
          return await this.roleRepository.save(role);
      }
      else{
        throw new NotFoundException("Role introuvale");
      }
    } catch (error) {
        this.logger.error(error);
        throw error;
    }
  }

  async remove(id: number): Promise<boolean> {
        const role = await this.findById(id);
        if (!role) {
           return false;
        }
        role.is_deleted= true;
        await this.roleRepository.save(role);
        return true;
  }
}
