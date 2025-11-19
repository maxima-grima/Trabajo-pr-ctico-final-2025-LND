export interface Product {
  id: number;
  name: string,
  description: string,
  price: number,
  restaurantId: number,
  categoryId: number,
  featured: boolean,
  recommendedFor: number,
  discount: number,
  hasHappyHour: boolean,
}

export type NewProduct = Omit<Product, "id">;

export interface DiscountData {
  discount: number;
}

export interface HappyHourData {
  hasHappyHour: boolean;
}