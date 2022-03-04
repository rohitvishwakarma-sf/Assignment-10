import { Observable } from 'rxjs';

export interface IUSERCRUD<T> {
  createUser(obj: T): void;
  getUsers(): any;
  deleteUser(obj: T): Observable<any>;
  saveUser(obj: T): Observable<any>;
}
