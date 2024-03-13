import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipconfirmComponent } from './membershipconfirm.component';

describe('MembershipconfirmComponent', () => {
  let component: MembershipconfirmComponent;
  let fixture: ComponentFixture<MembershipconfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipconfirmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembershipconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
