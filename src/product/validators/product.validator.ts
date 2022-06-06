import { Currencies } from 'src/utils/constants';
import { z } from 'zod';

export const ProductValidator = z.object({
  name: z.string(),
  description: z.string(),
  imgURL: z.string(),
  currency: z.nativeEnum(Currencies),
  price: z.number(),
});

export const ArrayProductoValidator = z.array(ProductValidator);
