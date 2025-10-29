import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListItem } from './users-list-item';

describe('UsersListItem', () => {
  let component: UsersListItem;
  let fixture: ComponentFixture<UsersListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
