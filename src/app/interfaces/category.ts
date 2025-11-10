export interface Category {
    name: string;
    id: number;
    restaurantId: number;

}
export type NewCategory = Omit<Category, "id">;