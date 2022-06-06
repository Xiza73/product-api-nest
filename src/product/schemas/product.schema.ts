import { Schema } from 'mongoose';

export const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    imgURL: String,
    currency: {
      type: String,
      default: 'PEN',
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);
