import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteProfileComponent } from './cliente-profile.page';

describe('ClienteProfileComponent', () => {
  let component: ClienteProfileComponent;
  let fixture: ComponentFixture<ClienteProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
