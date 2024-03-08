import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoProdutoComponent } from './grafico-produto.component';

describe('GraficoProdutoComponent', () => {
  let component: GraficoProdutoComponent;
  let fixture: ComponentFixture<GraficoProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoProdutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
