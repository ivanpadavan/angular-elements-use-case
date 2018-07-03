import {AbstractControl, FormControl} from '@angular/forms';

const isString = (s) => !!s;

export class MyValidators {
  static handleNumber(control: AbstractControl) {
    const text = control.value;
    if (isString(text)) {
      const notAcceptableSymbols = /[^0-9.,-]/;
      if (text.match(notAcceptableSymbols)) {
        control.setValue(text.split(notAcceptableSymbols).join(''));
      }
      if (text.includes(',')) {
        control.setValue(text.split(',').join('.'));
      }
    }
    return null;
  }

  static lat(control: AbstractControl) {
    const value = parseFloat(control.value);
    if (Math.abs(value) > 90 || isNaN(value)) {
      return {lat: 'Широта должа быть от -90 до +90'};
    } else {
      return null;
    }
  }
  static lon(control: AbstractControl) {
    const value = parseFloat(control.value);
    if (Math.abs(value) > 180 || isNaN(value)) {
      return {lat: 'Широта должа быть от -180 до +180'};
    } else {
      return null;
    }
  }

  static handleColor(control: AbstractControl) {
    const value = control.value;
    if (isString(value)) {
      const firstChar = value.slice(0, 1);
      if (firstChar !== '#' && firstChar.length) {
        control.setValue('#' + value);
      }
      if (value.length > 1 && !value.slice(-1).match(/^[0-9a-fA-F]$/)) {
        control.setValue(value.slice(0, -1));
      }
    }
    return null;
  }

  static color(control: AbstractControl) {
    const value = control.value;

    const isColor = (s: string) => isString(s) && s.match(/^[#][0-9a-fA-F]{6}$/);
    return isColor(value)
      ? null
      : {color: 'Цвет дожен начинаться с # и иметь 6 допустимых символов'};
  }

  static max = (n: number) => (control: FormControl) => {
    const value = control.value;
    if (isString(value) && value.length > n) {
      control.setValue(value.slice(1, -1));
    }
    return null;
  }
}

