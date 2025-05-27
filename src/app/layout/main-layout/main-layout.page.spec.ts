import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutPage } from './main-layout.page';

describe('MainLayoutComponent', () => {
  let component: MainLayoutPage;
  let fixture: ComponentFixture<MainLayoutPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLayoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
