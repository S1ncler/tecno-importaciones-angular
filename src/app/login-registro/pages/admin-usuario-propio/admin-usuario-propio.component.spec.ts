import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsuarioPropioComponent } from './admin-usuario-propio.component';

describe('AdminUsuarioPropioComponent', () => {
  let component: AdminUsuarioPropioComponent;
  let fixture: ComponentFixture<AdminUsuarioPropioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUsuarioPropioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUsuarioPropioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
