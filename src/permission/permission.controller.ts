import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
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
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }
  
  @Public()
  @Get("/find/all")
  findAll(@Body() paginationDto: PaginationDto) {
    return this.permissionService.findAll(paginationDto);
  }

  @AuthorizedRoles("ADMIN")
  @Get('/find/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.permissionService.findById(+id);
  }

  @AuthorizedRoles("ADMIN")
  @Patch('/update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(+id, updatePermissionDto);
  }

  @AuthorizedRoles("ADMIN")
  @Delete('/delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.permissionService.remove(+id);
  }
}
