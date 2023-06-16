import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoFilterComponent } from './produto-filter.component';

describe('ProdutoFilterComponent', () => {
  let component: ProdutoFilterComponent;
  let fixture: ComponentFixture<ProdutoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
