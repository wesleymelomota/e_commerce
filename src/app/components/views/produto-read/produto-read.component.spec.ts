import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoReadComponent } from './produto-read.component';

describe('ProdutoReadComponent', () => {
  let component: ProdutoReadComponent;
  let fixture: ComponentFixture<ProdutoReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
