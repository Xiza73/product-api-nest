import { HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';
import {
  ArrayProductoValidator,
  ProductValidator,
} from './validators/product.validator';
import { productResponse, ProductResponse } from './responses/product.response';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async createProduct(
    createProductDTO: CreateProductDTO,
  ): Promise<ProductResponse> {
    try {
      const newProduct = new this.productModel(createProductDTO);
      ProductValidator.parse(newProduct);
      const product = await newProduct.save();
      return productResponse(
        HttpStatus.OK,
        true,
        'Producto creado correctamente',
        null,
        product,
      );
    } catch (error) {
      return productResponse(
        HttpStatus.BAD_REQUEST,
        false,
        'Error al crear el producto',
        error,
      );
    }
  }

  async getProducts(): Promise<ProductResponse> {
    try {
      const products = await this.productModel.find();
      ArrayProductoValidator.parse(products);
      return productResponse(
        HttpStatus.OK,
        true,
        'Productos obtenidos correctamente',
        null,
        products,
      );
    } catch (error) {
      return productResponse(
        HttpStatus.BAD_REQUEST,
        false,
        'Error al obtener los productos',
        error,
      );
    }
  }

  async getProduct(productID: string): Promise<ProductResponse> {
    try {
      const product = await this.productModel.findById(productID);
      ProductValidator.parse(product);
      return productResponse(
        HttpStatus.OK,
        true,
        'Producto obtenido correctamente',
        null,
        product,
      );
    } catch (error) {
      return productResponse(
        HttpStatus.BAD_REQUEST,
        false,
        'Error al obtener el producto',
        error,
      );
    }
  }

  async updateProduct(
    productID: string,
    updateProductDTO: CreateProductDTO,
  ): Promise<ProductResponse> {
    try {
      ProductValidator.parse(updateProductDTO);
      const product = await this.productModel.findByIdAndUpdate(
        productID,
        updateProductDTO,
        { new: true },
      );
      return productResponse(
        HttpStatus.OK,
        true,
        'Producto actualizado correctamente',
        null,
        product,
      );
    } catch (error) {
      return productResponse(
        HttpStatus.BAD_REQUEST,
        false,
        'Error al actualizar el producto',
        error,
      );
    }
  }

  async deleteProduct(productID: string): Promise<ProductResponse> {
    try {
      const product = await this.productModel.findByIdAndRemove(productID);
      return productResponse(
        HttpStatus.OK,
        true,
        'Producto eliminado correctamente',
        null,
        product,
      );
    } catch (error) {
      return productResponse(
        HttpStatus.BAD_REQUEST,
        false,
        'Error al eliminar el producto',
        error,
      );
    }
  }
}
