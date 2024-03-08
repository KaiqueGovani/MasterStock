import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProdutosComponent } from './item-produtos.component';

describe('ItemProdutosComponent', () => {
  let component: ItemProdutosComponent;
  let fixture: ComponentFixture<ItemProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemProdutosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
