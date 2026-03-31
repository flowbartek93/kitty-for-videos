import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignsDataAccess } from './campaigns-data-access';

describe('CampaignsDataAccess', () => {
  let component: CampaignsDataAccess;
  let fixture: ComponentFixture<CampaignsDataAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignsDataAccess],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignsDataAccess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
