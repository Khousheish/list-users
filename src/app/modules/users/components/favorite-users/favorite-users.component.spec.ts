import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteUsersComponent } from './favorite-users.component';

describe('FavoriteUsersComponent', () => {
  let component: FavoriteUsersComponent;
  let fixture: ComponentFixture<FavoriteUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FavoriteUsersComponent],
    });
    fixture = TestBed.createComponent(FavoriteUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
