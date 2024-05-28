import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementcreateComponent } from './announcementcreate.component';

describe('AnnouncementcreateComponent', () => {
  let component: AnnouncementcreateComponent;
  let fixture: ComponentFixture<AnnouncementcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementcreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnouncementcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
