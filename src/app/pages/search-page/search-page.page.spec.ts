import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPagePage } from './search-page.page';

describe('SearchPageComponent', () => {
  let component: SearchPagePage;
  let fixture: ComponentFixture<SearchPagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPagePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
