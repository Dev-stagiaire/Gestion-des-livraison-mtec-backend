import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthorizedRoles } from 'src/common/decorators/roles.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RolePermissionsDto } from './dto/role_permissions.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @AuthorizedRoles("ADMIN")
  @Post("/create")
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }

  @Public()
  @Get("/find/all")
  async findAll(@Query() paginationDto: PaginationDto) {
    return await this.roleService.findAll(paginationDto);
  }

  @Get('/find/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.roleService.findById(+id);
  }

  @AuthorizedRoles("ADMIN")
  @Patch('/update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return await this.roleService.update(+id, updateRoleDto);
  }

  @AuthorizedRoles("ADMIN")
  @Delete('/remove/:id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }

  @AuthorizedRoles("ADMIN")
  @Post("/grant/permission")
  async grantPermission(@Body() grantPermissionDto: RolePermissionsDto){
      return await this.roleService.grantPermission(grantPermissionDto);
  }

  @AuthorizedRoles("ADMIN")
  @Post("/revoke/permission")
  async revokePermission(@Body() grantPermissionDto: RolePermissionsDto){
      return await this.roleService.revokePermission(grantPermissionDto);
  }
}
