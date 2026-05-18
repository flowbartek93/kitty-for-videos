import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureCreate } from './feature-create';

describe('FeatureCreate', () => {
  let component: FeatureCreate;
  let fixture: ComponentFixture<FeatureCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
