import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementdeleteComponent } from './announcementdelete.component';

describe('AnnouncementdeleteComponent', () => {
  let component: AnnouncementdeleteComponent;
  let fixture: ComponentFixture<AnnouncementdeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementdeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnouncementdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
