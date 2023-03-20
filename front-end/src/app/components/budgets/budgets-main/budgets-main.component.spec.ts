import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsMainComponent } from './budgets-main.component';

describe('BudgetsMainComponent', () => {
  let component: BudgetsMainComponent;
  let fixture: ComponentFixture<BudgetsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
