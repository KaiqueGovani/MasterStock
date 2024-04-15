import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarProdutosComponent } from './verificar-produtos.component';

describe('VerificarProdutosComponent', () => {
  let component: VerificarProdutosComponent;
  let fixture: ComponentFixture<VerificarProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificarProdutosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerificarProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
