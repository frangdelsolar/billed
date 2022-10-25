import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceHistoricalComponent } from './balance-historical.component';

describe('BalanceHistoricalComponent', () => {
  let component: BalanceHistoricalComponent;
  let fixture: ComponentFixture<BalanceHistoricalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceHistoricalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceHistoricalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
