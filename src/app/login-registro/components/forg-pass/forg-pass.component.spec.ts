import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgPassComponent } from './forg-pass.component';

describe('ForgPassComponent', () => {
  let component: ForgPassComponent;
  let fixture: ComponentFixture<ForgPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
