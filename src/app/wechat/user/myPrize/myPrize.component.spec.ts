import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPrizeComponent } from './myPrize.component';

describe('MmyPrizeComponent', () => {
  let component: MyPrizeComponent;
  let fixture: ComponentFixture<MyPrizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPrizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
