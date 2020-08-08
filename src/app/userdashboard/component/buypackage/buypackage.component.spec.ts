import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuypackageComponent } from './buypackage.component';

describe('BuypackageComponent', () => {
  let component: BuypackageComponent;
  let fixture: ComponentFixture<BuypackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuypackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuypackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
