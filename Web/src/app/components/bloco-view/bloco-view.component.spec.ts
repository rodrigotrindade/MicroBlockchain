import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocoViewComponent } from './bloco-view.component';

describe('BlocoViewComponent', () => {
  let component: BlocoViewComponent;
  let fixture: ComponentFixture<BlocoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocoViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
