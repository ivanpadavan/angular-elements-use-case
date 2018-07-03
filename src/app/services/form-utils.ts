import {FormArray, FormGroup} from '@angular/forms';

export function markFormDirty (group: FormGroup | FormArray): void {
  const controls = Object.keys(group.controls).map(x => group.controls[x]);
  controls.forEach(x => {
    if (x instanceof FormArray || x instanceof FormGroup) {
      markFormDirty(x);
    } else {
      x.updateValueAndValidity();
      x.markAsDirty();
    }
  });
}

export function markFormPristine (group: FormGroup | FormArray): void {
  const controls = Object.keys(group.controls).map(x => group.controls[x]);
  controls.forEach(x => x instanceof FormArray || x instanceof FormGroup
    ? markFormPristine(x)
    : x.markAsPristine());
}
