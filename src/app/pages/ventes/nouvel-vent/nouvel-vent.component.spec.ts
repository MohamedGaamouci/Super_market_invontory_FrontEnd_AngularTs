import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelVentComponent } from './nouvel-vent.component';

describe('NouvelVentComponent', () => {
  let component: NouvelVentComponent;
  let fixture: ComponentFixture<NouvelVentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouvelVentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelVentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
