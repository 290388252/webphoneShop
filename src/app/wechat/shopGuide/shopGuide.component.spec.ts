import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopGuideComponent } from './shopGuide.component';

describe('ShopGuideComponent', () => {
  let component: ShopGuideComponent;
  let fixture: ComponentFixture<ShopGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
