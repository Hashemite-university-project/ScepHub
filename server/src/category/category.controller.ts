import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/role.enum';

@ApiTags('Category APIs')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400, description: 'invalid inputs' })
  @ApiResponse({ status: 401, description: 'Unothorized "just for admins"' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    await this.categoryService.createCategory(createCategoryDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'category added successfully',
    };
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401, description: 'Unothorized "just for admins"' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  async findAllCategories() {
    const allCategories = await this.categoryService.findAllCategories();
    return allCategories;
  }
}
