import { AbstractControl, ValidatorFn } from '@angular/forms';

export function minLength(): ValidatorFn {
  return (control: AbstractControl) => {
    if (control.value && typeof control.value === 'string') {
      return control.value.trim().length > 0 ? null : { ValidText: true };
    }
    return { ValidText: true };
  };
}
// export function sendTitleTooltip(titleTootip:string): ValidatorFn {
//     return (control: AbstractControl) => {

//     }
// }
