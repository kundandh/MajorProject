import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersMembershipComponent } from './users-membership.component';

describe('UsersMembershipComponent', () => {
  let component: UsersMembershipComponent;
  let fixture: ComponentFixture<UsersMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersMembershipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
