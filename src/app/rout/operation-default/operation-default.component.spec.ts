import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationDefaultComponent } from './operation-default.component';

describe('OperationDefaultComponent', () => {
  let component: OperationDefaultComponent;
  let fixture: ComponentFixture<OperationDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
