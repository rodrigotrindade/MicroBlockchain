import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacoesTableComponent } from './transacoes-table.component';

describe('TransacoesTableComponent', () => {
  let component: TransacoesTableComponent;
  let fixture: ComponentFixture<TransacoesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransacoesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransacoesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
