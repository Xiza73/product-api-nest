import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Body,
  Param,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('api/product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async createPost(
    @Res() res: any,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    res.json(await this.productService.createProduct(createProductDTO));
  }

  @Get()
  async getProducts(@Res() res: any) {
    res.json(await this.productService.getProducts());
  }

  @Get('/:id')
  async getProduct(@Res() res: any, @Param('id') id: string) {
    res.json(await this.productService.getProduct(id));
  }

  @Put('/:id')
  async updateProduct(
    @Res() res: any,
    @Param('id') id: string,
    @Body() body: CreateProductDTO,
  ) {
    res.json(await this.productService.updateProduct(id, body));
  }

  @Delete('/:id')
  async deleteProduct(@Res() res: any, @Param('id') id: string) {
    res.json(await this.productService.deleteProduct(id));
  }
}
