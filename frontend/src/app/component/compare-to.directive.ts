import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[compareTo]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CompareToDirective, multi: true }]
})
export class CompareToDirective implements Validator {
  @Input('compareTo') otherControl: AbstractControl | null = null;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.otherControl) {
      return null;
    }

    const isMatch = control.value === this.otherControl.value;
    return isMatch ? null : { compareTo: true };
  }
}