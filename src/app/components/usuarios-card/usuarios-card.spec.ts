import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosCard } from './usuarios-card';

describe('UsuariosCard', () => {
  let component: UsuariosCard;
  let fixture: ComponentFixture<UsuariosCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
