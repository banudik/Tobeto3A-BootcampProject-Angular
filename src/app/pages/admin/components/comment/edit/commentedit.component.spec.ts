import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommenteditComponent } from './commentedit.component';

describe('CommenteditComponent', () => {
  let component: CommenteditComponent;
  let fixture: ComponentFixture<CommenteditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommenteditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommenteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
