import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosCard } from './prestamos-card';

describe('PrestamosCard', () => {
  let component: PrestamosCard;
  let fixture: ComponentFixture<PrestamosCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestamosCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamosCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
