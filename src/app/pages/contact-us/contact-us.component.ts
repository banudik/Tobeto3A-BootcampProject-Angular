import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DarkModeService } from '../../features/services/concretes/dark-mode.service';
import { HttpClientModule } from '@angular/common/http';
import { ContactService } from '../../features/services/concretes/contact.service';
import { ToastrService } from 'ngx-toastr';
import { ContactFormModel } from '../../features/models/requests/contact/contact-form-model';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule,HttpClientModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  formData: ContactFormModel = {
    name: '',
    email: '',
    message: ''
  };

  ngOnInit(): void {
    window.scrollTo(0,0);
  }
  submitForm() {
    this.contactService.sendContactForm(this.formData).subscribe(
      response => {
        console.log('Form submitted:', response);
        this.toastr.success('Your message has been sent successfully!');
      },
      error => {
        console.error('Error submitting form:', error);
        this.toastr.error('Failed to send your message.');
      }
    );
  }


  darkModeService: DarkModeService = inject(DarkModeService);
  contactService: ContactService = inject(ContactService);
  toastr: ToastrService = inject(ToastrService);
}
