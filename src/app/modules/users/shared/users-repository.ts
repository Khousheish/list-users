import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PaginatedUsersResponse } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersRepository {
  constructor(private readonly httpClient: HttpClient) {}

  getUsers(): Observable<PaginatedUsersResponse> {
    return this.httpClient.get<PaginatedUsersResponse>(`https://reqres.in/api/users?per_page=10`);
  }
}
