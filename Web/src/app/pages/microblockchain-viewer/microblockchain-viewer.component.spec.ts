import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroblockchainViewerComponent } from './microblockchain-viewer.component';

describe('MicroblockchainViewerComponent', () => {
  let component: MicroblockchainViewerComponent;
  let fixture: ComponentFixture<MicroblockchainViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroblockchainViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroblockchainViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
