export interface product {
  id: number;
  name: string,
  description: string,
  price: 0,
  restaurantId:number,
  categoryId: 0,
  IsFeatured: true,
  recommendedFor: 0,
  discount: 0,
  hasHappyHour: true
}

export type NewProduct = Omit<product, "id">;

export interface DiscountData {
  discount: number;
}

export interface HappyHourData {
  hasHappyHour: boolean;
}