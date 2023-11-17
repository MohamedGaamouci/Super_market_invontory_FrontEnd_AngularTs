import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageVentesComponentComponent } from './page-ventes-component.component';

describe('PageVentesComponentComponent', () => {
  let component: PageVentesComponentComponent;
  let fixture: ComponentFixture<PageVentesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageVentesComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageVentesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
