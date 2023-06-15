import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalCompraComponent } from './final-compra.component';

describe('FinalCompraComponent', () => {
  let component: FinalCompraComponent;
  let fixture: ComponentFixture<FinalCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalCompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
