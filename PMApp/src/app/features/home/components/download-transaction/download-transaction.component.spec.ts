import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadTransactionComponent } from './download-transaction.component';

describe('DownloadTransactionComponent', () => {
  let component: DownloadTransactionComponent;
  let fixture: ComponentFixture<DownloadTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
