import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appConfirmPassword]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ConfirmPasswordDirective,
      multi: true
    }
  ]
})
export class ConfirmPasswordDirective implements Validator {
  @Input('appConfirmPassword') confirmPasswordField!: string;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.parent) return null; // Ensure control has a parent form

    const password = control.parent.get(this.confirmPasswordField)?.value;
    const confirmPassword = control.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
