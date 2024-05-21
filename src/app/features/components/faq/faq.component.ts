import { Component, inject } from '@angular/core';
import { FAQItem } from '../../models/const/FAQItem'; // FAQItem'ı içe aktardık
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
  faqList: FAQItem[] = FAQList; // FAQList'ı FaqComponent sınıfının özelliğine atadık

  toggleAnswer(faq: any) {
    faq.isOpen = !faq.isOpen;
}

darkModeService: DarkModeService = inject(DarkModeService);
}
