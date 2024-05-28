import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementeditComponent } from './announcementedit.component';

describe('AnnouncementeditComponent', () => {
  let component: AnnouncementeditComponent;
  let fixture: ComponentFixture<AnnouncementeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnouncementeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
