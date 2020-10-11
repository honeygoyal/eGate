import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamInstructionsComponent } from './exam-instructions.component';

describe('ExamInstructionsComponent', () => {
  let component: ExamInstructionsComponent;
  let fixture: ComponentFixture<ExamInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
