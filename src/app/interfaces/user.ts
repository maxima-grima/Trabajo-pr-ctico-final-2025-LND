export interface User {
<<<<<<< HEAD
  restaurantName: "string"
  password: "string"
  firstName: "string"
  lastName: "string"
  adress: "string"
  phoneNumber: "string"
}
=======
  id: number
  restaurantName: string,
  password: string,
  firstName: string,
  lastName: string,
  adress: string,
  phoneNumber: string
}
export type NewUser = Omit<User, "id">;
>>>>>>> f77fbf4d7b262dc19987e6946bffc4d76af16701
