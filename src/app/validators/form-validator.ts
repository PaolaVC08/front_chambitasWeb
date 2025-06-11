// src/app/validaciones/validaciones.ts

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class FormValidator {

  static nombreApellidoValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
    const pattern = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]*$/;
    return pattern.test(value) ? null : { invalidNombre: true };
  }
}

  static correoValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      return pattern.test(control.value) ? null : { invalidCorreo: true };
    };
  }

  static contraseñaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pattern = /^(?=.*[A-Za-z])(?=.*\d).+$/;
      return pattern.test(control.value) ? null : { invalidContraseña: true };
    };
  }

  static edadValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const today = new Date();
      const birthDate = new Date(control.value);

      const maxDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());

      if (birthDate > maxDate) {
        return { edadInsuficiente: true };
      }

      return null;
    };
  }

}
