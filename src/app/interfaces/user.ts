export interface User {
  id: number
  restaurantName: string,
  password: string,
  firstName: string,
  lastName: string,
  adress: string,
  phoneNumber: string
}
export type NewUser = Omit<User, "id">;