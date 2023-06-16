import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProdutoCreateComponent } from './form-produto-create.component';

describe('FormProdutoCreateComponent', () => {
  let component: FormProdutoCreateComponent;
  let fixture: ComponentFixture<FormProdutoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProdutoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormProdutoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
