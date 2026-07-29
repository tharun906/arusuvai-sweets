import api from './api';
import type { Category } from '../types/category.types';

const CategoryService = {
  // GET /api/categories — returns all categories (active + inactive)
  getAllCategories: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/api/categories');
    return response.data;
  },

  // Customer-facing helper: filters to active only, per business rule
  // that customers must never see inactive categories.
  getActiveCategories: async (): Promise<Category[]> => {
    const categories = await CategoryService.getAllCategories();
    return categories.filter((category) => category.active);
  },
};

export default CategoryService;