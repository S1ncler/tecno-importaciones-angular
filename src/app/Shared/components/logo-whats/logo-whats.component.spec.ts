import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoWhatsComponent } from './logo-whats.component';

describe('LogoWhatsComponent', () => {
  let component: LogoWhatsComponent;
  let fixture: ComponentFixture<LogoWhatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoWhatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoWhatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
