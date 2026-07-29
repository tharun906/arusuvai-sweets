import type { Category } from './category.types';

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price250g: number;
  price500g: number;
  price1kg: number;
  currentStockKg: number;
  lowStockAlertKg: number;
  active: boolean;
  category?: Category;
  categoryId?: number;
}