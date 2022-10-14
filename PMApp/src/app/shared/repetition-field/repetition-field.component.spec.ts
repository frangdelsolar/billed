import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepetitionFieldComponent } from './repetition-field.component';

describe('RepetitionFieldComponent', () => {
  let component: RepetitionFieldComponent;
  let fixture: ComponentFixture<RepetitionFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepetitionFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepetitionFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
