import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptDetailsComponent } from './receipt-details.component';

describe('ReceiptDetailsComponent', () => {
  let component: ReceiptDetailsComponent;
  let fixture: ComponentFixture<ReceiptDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiptDetailsComponent]
    });
    fixture = TestBed.createComponent(ReceiptDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
