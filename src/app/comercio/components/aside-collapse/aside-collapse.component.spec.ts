import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideCollapseComponent } from './aside-collapse.component';

describe('AsideCollapseComponent', () => {
  let component: AsideCollapseComponent;
  let fixture: ComponentFixture<AsideCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsideCollapseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsideCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
