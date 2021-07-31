import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { baseURL } from './globals';
import { IUSERCRUD } from './IUSERCRUD';
import { User } from './user.model';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersService implements IUSERCRUD<User> {
  usersChanged = new EventEmitter<User[]>();
  users: User[] = [];
  constructor(private http: HttpClient) {}

  async getUsers(): Promise<User[]> {
    this.users = await this.http.get<User[]>(baseURL).toPromise();
    return this.users.slice();
  }

  createUser(obj: User): void {
    throw new Error('Method not implemented.');
  }

  // deleting user
  deleteUser(user: User): Observable<any> {
    return this.http.delete<string>(baseURL + '/' + user.id).pipe(
      map(() => {
        const index = this.users.findIndex((u) => u.id === user.id);
        this.users.splice(index, 1);
        this.usersChanged.emit(this.users.slice());
      })
    );
  }

  // update user
  saveUser(obj: User): Observable<any> {
    return this.http.patch(baseURL + '/save', obj);
  }

  async getCustomers(fields: string[]): Promise<any> {
    let params = fields.join('&fields=');
    const res = await fetch(`${baseURL}/customers/?fields=${params}`);
    const data = await res.json();
    const customers = data as { name: string; user_id: number }[];
    return customers;
  }
}
