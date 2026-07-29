import type { Weight } from '../types/cart.types';

export const WEIGHT_OPTIONS: Weight[] = ['250g', '500g', '1kg'];

export function getPriceForWeight(
  product: { price250g: number; price500g: number; price1kg: number },
  weight: Weight
): number {
  switch (weight) {
    case '250g':
      return product.price250g;
    case '500g':
      return product.price500g;
    case '1kg':
      return product.price1kg;
    default:
      return product.price250g;
  }
}