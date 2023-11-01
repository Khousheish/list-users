import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '@Environment';
import { MOCKED_PAGINATED_USER_RESPONSE } from '@Mocks/users.mocks';

import { PaginatedUsersResponse } from './user.interface';
import { UsersRepository } from './users-repository';

describe('UsersRepository', () => {
  let repository: UsersRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersRepository],
    });
    httpMock = TestBed.inject(HttpTestingController);
    repository = TestBed.inject(UsersRepository);
  });

  afterEach((): void => {
    httpMock.verify();
  });

  describe('getUsers', (): void => {
    it('should return users details', (done: DoneFn): void => {
      repository.getUsers().subscribe((users: PaginatedUsersResponse): void => {
        expect(users).toEqual(MOCKED_PAGINATED_USER_RESPONSE);

        done();
      });

      const getUserRequest: TestRequest = httpMock.expectOne({
        method: 'GET',
        url: `${environment.apiUrl}/users?per_page=10`,
      });

      expect(getUserRequest.request.method).toEqual('GET');
      getUserRequest.flush(MOCKED_PAGINATED_USER_RESPONSE);

      httpMock.verify();
    });

    it('should throw error when get users request fails', (done: DoneFn): void => {
      const errorText: string = 'ERROR';

      repository.getUsers().subscribe({
        next: (): null => null,
        error: (err: HttpErrorResponse): void => {
          expect(err.statusText).toEqual(errorText);

          done();
        },
      });

      const getUserRequest: TestRequest = httpMock.expectOne({
        method: 'GET',
        url: `${environment.apiUrl}/users?per_page=10`,
      });

      getUserRequest.error(new ProgressEvent(errorText), { statusText: errorText });
    });
  });
});
