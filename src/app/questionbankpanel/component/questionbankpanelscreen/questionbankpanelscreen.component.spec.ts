import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionbankpanelscreenComponent } from './questionbankpanelscreen.component';

describe('QuestionbankpanelscreenComponent', () => {
  let component: QuestionbankpanelscreenComponent;
  let fixture: ComponentFixture<QuestionbankpanelscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionbankpanelscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionbankpanelscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
