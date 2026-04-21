import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppCore } from './app-core';

describe('AppCore', () => {
  let component: AppCore;
  let fixture: ComponentFixture<AppCore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCore],
    }).compileComponents();

    fixture = TestBed.createComponent(AppCore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
