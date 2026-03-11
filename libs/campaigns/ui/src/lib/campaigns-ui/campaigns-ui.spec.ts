import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignsUi } from './campaigns-ui';

describe('CampaignsUi', () => {
  let component: CampaignsUi;
  let fixture: ComponentFixture<CampaignsUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignsUi],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignsUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
