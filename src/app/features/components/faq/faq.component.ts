import { Component, inject } from '@angular/core';
import { FAQItem } from '../../models/const/FAQItem'; 
import { FAQList } from '../../models/const/FAQList';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DarkModeService } from '../../services/dark-mode.service';


@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent {
  faqList: FAQItem[] = FAQList; 

  toggleAnswer(faq: any) {
    faq.isOpen = !faq.isOpen;
}

ngOnInit(): void {
  window.scrollTo(0,0);
}
darkModeService: DarkModeService = inject(DarkModeService);
}
