import { Component } from '@angular/core';
import { FAQItem } from '../../models/const/FAQItem'; // FAQItem'ı içe aktardık
import { FAQList } from '../../models/const/FAQList';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  faqList: FAQItem[] = FAQList; // FAQList'ı FaqComponent sınıfının özelliğine atadık

  toggleAnswer(faq: any) {
    faq.isOpen = !faq.isOpen;
}
}
