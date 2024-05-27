import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DarkModeService } from '../../features/services/dark-mode.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  ngOnInit(): void {
    window.scrollTo(0,0);
  }
  submitForm() {
    // İletişim formunun gönderim işlemleri burada yapılabilir
    console.log('Form submitted:', this.formData);
    // Burada gönderilen verileri bir hizmete gönderebilir ve e-posta gönderebilirsiniz.
    // Örnek olarak, HttpClient kullanarak bir HTTP POST isteği yapılabilir.
  }

  darkModeService: DarkModeService = inject(DarkModeService);
}
