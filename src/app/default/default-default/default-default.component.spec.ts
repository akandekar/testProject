import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultDefaultComponent } from './default-default.component';

describe('DefaultDefaultComponent', () => {
  let component: DefaultDefaultComponent;
  let fixture: ComponentFixture<DefaultDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
