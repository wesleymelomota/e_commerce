import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioConfigComponent } from './usuario-config.component';

describe('UsuarioConfigComponent', () => {
  let component: UsuarioConfigComponent;
  let fixture: ComponentFixture<UsuarioConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
