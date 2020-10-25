import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacoesPendentesComponent } from './transacoes-pendentes.component';

describe('TransacoesPendentesComponent', () => {
  let component: TransacoesPendentesComponent;
  let fixture: ComponentFixture<TransacoesPendentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransacoesPendentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransacoesPendentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
