import { inject, Injectable } from '@angular/core';
import { NewUser, User } from '../interfaces/user';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly UrlBase = "https://w370351.ferozo.com/api/users";
  authService = inject(AuthService)
  users: User[] = []
  async getUsers() {
    const res = await fetch(this.UrlBase,
      {
        method: 'GET'

      });
      if (!res.ok) return;
      const resJson : User [] = await res.json ()
      this.users = resJson
  }
  async getUsersbyId(id: string | number) {
    const res = await fetch(`${this.UrlBase}/${id}`,
      {
        method: 'GET'

      });
      if (!res.ok) return;
      const user : User = await res.json();
      return user;
  }
  async createUser(newUser: NewUser) {
    const res = await fetch(this.UrlBase,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });
    if (!res.ok) return;
    const resUser: User = await res.json();
    this.users.push(resUser);
    return resUser;
  }

  async updateUser(id: string | number, userEditado: User) {
    const res = await fetch("https://w370351.ferozo.com/api/users/:id", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authService.token
      },
      body: JSON.stringify(userEditado)
    });
    if (!res.ok) return;
    this.users = this.users.map(user => {
      if (user.id === userEditado.id) {
        return userEditado;
      };
      return user;
    });
    return userEditado;

  }
  async deleteUser(id: string | number) {
    const res = await fetch(`${this.UrlBase}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + this.authService.token
      }
    });
}
}
