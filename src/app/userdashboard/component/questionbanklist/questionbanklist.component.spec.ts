import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionbanklistComponent } from './questionbanklist.component';

describe('QuestionbanklistComponent', () => {
  let component: QuestionbanklistComponent;
  let fixture: ComponentFixture<QuestionbanklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionbanklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionbanklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
