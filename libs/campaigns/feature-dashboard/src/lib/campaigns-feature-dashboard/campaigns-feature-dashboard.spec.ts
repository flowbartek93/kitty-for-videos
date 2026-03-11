import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignsFeatureDashboard } from './campaigns-feature-dashboard';

describe('CampaignsFeatureDashboard', () => {
  let component: CampaignsFeatureDashboard;
  let fixture: ComponentFixture<CampaignsFeatureDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignsFeatureDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignsFeatureDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
