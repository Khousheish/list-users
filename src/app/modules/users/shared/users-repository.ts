import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@Environment';

import { PaginatedUsersResponse } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersRepository {
  constructor(private readonly httpClient: HttpClient) {}

  getUsers(): Observable<PaginatedUsersResponse> {
    return this.httpClient.get<PaginatedUsersResponse>(`${environment.apiUrl}/users?per_page=10`);
  }
}
