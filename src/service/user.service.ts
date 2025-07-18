import { Injectable, signal } from '@angular/core';

export interface User {
  id: number;
  profilePhoto: string;
  firstName: string;
  lastName: string;
  age: number;
  education: string;
  nationalId: string;
  birthDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users = signal<User[]>([]);

  getUsers() {
    return this.users;
  }

  addUser(user: User) {
    this.users.update((list) => [...list, { ...user, id: Date.now() }]);
  }

  updateUser(updated: User) {
    this.users.update((list) =>
      list.map((u) => (u.id === updated.id ? updated : u))
    );
  }

  deleteUser(id: number) {
    this.users.update((list) => list.filter((u) => u.id !== id));
  }
}
