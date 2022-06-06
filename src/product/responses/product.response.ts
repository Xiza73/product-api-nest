import { Product } from 'src/product/interfaces/product.interface';
import { SuccessResponse } from 'src/utils/types';

export interface ProductResponse extends SuccessResponse {
  data?: Product | Product[];
}

export const productResponse = (
  status: number,
  success: boolean,
  message: string,
  error: string,
  data?: Product | Product[],
): ProductResponse => {
  if (data) {
    return {
      status,
      success,
      message,
      error,
      data,
    };
  }
  return {
    status,
    success,
    message,
    error,
  };
};
