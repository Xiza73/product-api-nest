import { Document } from 'mongoose';

export interface Product extends Document {
  readonly name: string;
  readonly description: string;
  readonly imgURL: string;
  readonly currency: string;
  readonly price: number;
}
