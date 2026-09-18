import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { AuthorizedRoles } from 'src/common/decorators/roles.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @AuthorizedRoles("ADMIN")
  @Post("/create")
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    return await this.permissionService.create(createPermissionDto);
  }
  
  @Public()
  @Get("/find/all")
  async findAll(@Query() paginationDto: PaginationDto) {
    return await this.permissionService.findAll(paginationDto);
  }

  @AuthorizedRoles("ADMIN")
  @Get('/find/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.permissionService.findById(+id);
  }

  @AuthorizedRoles("ADMIN")
  @Patch('/update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePermissionDto: UpdatePermissionDto) {
    return await this.permissionService.update(+id, updatePermissionDto);
  }

  @AuthorizedRoles("ADMIN")
  @Delete('/delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.permissionService.remove(+id);
  }
}
