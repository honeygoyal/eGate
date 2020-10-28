import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchselectionComponent } from './branchselection.component';

describe('BranchselectionComponent', () => {
  let component: BranchselectionComponent;
  let fixture: ComponentFixture<BranchselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
