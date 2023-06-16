import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdPromoComponent } from './prod-promo.component';

describe('ProdPromoComponent', () => {
  let component: ProdPromoComponent;
  let fixture: ComponentFixture<ProdPromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdPromoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
