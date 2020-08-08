import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoseriesComponent } from './demoseries.component';

describe('DemoseriesComponent', () => {
  let component: DemoseriesComponent;
  let fixture: ComponentFixture<DemoseriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoseriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoseriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
