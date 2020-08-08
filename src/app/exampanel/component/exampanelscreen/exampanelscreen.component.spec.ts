import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampanelscreenComponent } from './exampanelscreen.component';

describe('ExampanelscreenComponent', () => {
  let component: ExampanelscreenComponent;
  let fixture: ComponentFixture<ExampanelscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampanelscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampanelscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
