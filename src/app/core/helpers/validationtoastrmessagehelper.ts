import { Injectable, inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";


@Injectable({
    providedIn: 'root'
})
export class ValidationHelper {
    constructor(private toastr: ToastrService) { }

    checkValidation(form: FormGroup): void {
        Object.keys(form.controls).forEach(key => {
            const controlErrors = form.get(key)?.errors;
            if (controlErrors != null) {
                const errorMessages = Object.keys(controlErrors).map(errorKey => {
                    switch (errorKey) {
                        case 'required':
                            return 'This field is required';
                        case 'minlength':
                            return `Minimum length is ${controlErrors[errorKey].requiredLength}`;
                        case 'maxlength':
                            return `Maximum length is ${controlErrors[errorKey].requiredLength}`;
                        // Diğer hata türlerini buraya ekleyin
                        default:
                            return `Unknown error: ${errorKey}`;
                    }
                }).join(', ');
                this.toastr.warning(key + ' field has errors: ' + errorMessages);
            }
        });
    }
}