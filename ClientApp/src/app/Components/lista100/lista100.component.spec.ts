import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Lista100Component } from './lista100.component';

describe('Lista100Component', () => {
  let component: Lista100Component;
  let fixture: ComponentFixture<Lista100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Lista100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Lista100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
