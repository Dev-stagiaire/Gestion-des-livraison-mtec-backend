import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Generic } from 'src/generic/generic.service';
import { PermissionService } from 'src/permission/permission.service';
import { Permission } from 'src/permission/entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  controllers: [RoleController],
  providers: [RoleService, Generic, PermissionService], 
  exports: [TypeOrmModule, RoleService],
})
export class RoleModule {}
