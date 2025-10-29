import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = []
  readonly UrlBase = "https://restaurant-api.somee.com/api";
  authService = inject (AuthService)
async getUsers () {

}
async getUsersbyId (id: string | number){
  const res = await fetch (this.UrlBase + "/" + id)

}
async createUser (nuevoUser: User) {
  const res =  await fetch ( "https://restaurant-api.somee.com/api/users" ,
   {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.authService.token,
        },
        body: JSON.stringify(nuevoUser)
      });
    if (!res.ok) return;
    const resUser: User = await res.json();
    this.users.push(resUser);
    return resUser;
  }
}



