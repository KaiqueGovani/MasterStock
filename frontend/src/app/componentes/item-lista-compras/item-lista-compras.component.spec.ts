import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListaComprasComponent } from './item-lista-compras.component';

describe('ItemListaComprasComponent', () => {
  let component: ItemListaComprasComponent;
  let fixture: ComponentFixture<ItemListaComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemListaComprasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemListaComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
