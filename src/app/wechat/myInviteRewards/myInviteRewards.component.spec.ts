import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInviteRewardsComponent } from './myInviteRewards.component';

describe('MyInviteRewardsComponent', () => {
  let component: MyInviteRewardsComponent;
  let fixture: ComponentFixture<MyInviteRewardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyInviteRewardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInviteRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
