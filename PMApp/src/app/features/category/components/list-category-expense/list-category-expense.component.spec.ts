import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoryExpenseComponent } from './list-category-expense.component';

describe('ListCategoryExpenseComponent', () => {
  let component: ListCategoryExpenseComponent;
  let fixture: ComponentFixture<ListCategoryExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCategoryExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCategoryExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
