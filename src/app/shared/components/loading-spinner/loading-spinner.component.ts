import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { LoadingService } from '../../../features/services/concretes/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, NgxSpinnerModule],
  template: `
    <ngx-spinner
      bdColor="rgba(0, 0, 0, 0.8)"
      size="medium"
      color="#fff"
      type="square-jelly-box"
      [fullScreen]="true">
      <p style="color: white">Loading...</p>
    </ngx-spinner>
  `,
})
export class LoadingSpinnerComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService, private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.loading$.subscribe((loading) => {
      if (loading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }
}
