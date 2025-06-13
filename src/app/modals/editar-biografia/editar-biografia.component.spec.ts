import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBiografiaComponent } from './editar-biografia.component';

describe('EditarBiografiaComponent', () => {
  let component: EditarBiografiaComponent;
  let fixture: ComponentFixture<EditarBiografiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarBiografiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarBiografiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
