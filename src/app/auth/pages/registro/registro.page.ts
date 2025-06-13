import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TopbarPage } from '../../../shared/pages/topbar/topbar.page';
import { FormValidator } from '../../../validators/form-validator';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../../models/categoria.model';
import { CategoriasService } from '../../../services/categorias/categorias.service'; 
import { ZonasService } from '../../../services/zonas/zonas.service';
import { Zona } from '../../../models/zona.model';
import { ClienteRequestDTO } from '../../../models/cliente-request.dto';
import { ProfesionistaRequestDTO } from '../../../models/profesionista-request.dto';
import { MedioContacto } from '../../../models/MedioContacto.model';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TopbarPage, FormsModule],
  templateUrl: './registro.page.html',
  styleUrl: './registro.page.css'
})
export class RegistroPage {
  maxDate: String;
  tipoUsuario: string = '';
  categorias: Categoria[] = []; 
  profesiones: any[] = []; 
  zonas: Zona[] = [];
  selectedProfesion1: any; 
  selectedProfesion2: any;
  passwordVisible = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, 
    private categoriasService: CategoriasService,
    private zonasService: ZonasService){
      
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }
ngOnInit() {
    document.body.classList.add('auth-background');
    this.categoriasService.getProfesionesAgrupadas().subscribe(
      (data) => {
        this.categorias = data;
      },
      (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    );
    this.form.get('profesion1')?.disable();
    this.form.get('profesion2')?.disable();

    this.zonasService.getAllZonas().subscribe(
      (data) => {
        this.zonas = data;
      },
      (error) => {
        console.error('Error al obtener las zonas:', error);
      }
    );
  }

  ngOnDestroy() {
    document.body.classList.remove('auth-background');
  }

form = this.fb.group({
  nombre: ['', [Validators.required, FormValidator.nombreApellidoValidator()]],
  apellidoPaterno: ['', [Validators.required, FormValidator.nombreApellidoValidator()]],
  apellidoMaterno: ['', [Validators.required, FormValidator.nombreApellidoValidator()]],
  fechaNacimiento: ['', [Validators.required, FormValidator.edadValidator()]],
  tipoUsuario: ['', Validators.required],
  correo: ['', [Validators.required, FormValidator.correoValidator()]],
  contraseña: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), FormValidator.contraseñaValidator()]],
  categoria: [''],
  profesion1: [''],
  profesion2: [''],
  zona: ['',],
  tipoContacto: [''],
  valorContacto: [''] 
});
  onTipoUsuarioChange(event: any): void {
    this.tipoUsuario = event.target.value;
    const categoriaControl = this.form.get('categoria');
    const profesion1Control = this.form.get('profesion1');
    const profesion2Control = this.form.get('profesion2');
    const zonaControl = this.form.get('zona');
    const tipoContactoControl=this.form.get('tipoContacto');
    const valorContacto = this.form.get('valorContacto');

    if (this.tipoUsuario === 'Cuenta Profesional') {
      categoriaControl?.setValidators(Validators.required);
      profesion1Control?.setValidators(Validators.required);
      profesion2Control?.clearValidators(); 
      zonaControl?.setValidators(Validators.required);
      tipoContactoControl?.setValidators(Validators.required);
      valorContacto?.setValidators(Validators.required);
    } else {
      categoriaControl?.clearValidators();
      profesion1Control?.clearValidators();
      profesion2Control?.clearValidators();
      zonaControl?.clearValidators();
      tipoContactoControl?.clearValidators();
      valorContacto?.clearValidators();
    }
  
    categoriaControl?.updateValueAndValidity();
    profesion1Control?.updateValueAndValidity();
    profesion2Control?.updateValueAndValidity();
    zonaControl?.updateValueAndValidity();
    tipoContactoControl?.updateValueAndValidity();
    valorContacto?.updateValueAndValidity();
  }

onSubmit() {
  if (this.form.valid) {
    const formValue = this.form.value;
    const tipoCuentaTemp = formValue.tipoUsuario;
  
    if (tipoCuentaTemp === 'Cuenta Profesional') {
      const profesionesSeleccionadas: number[] = [];
      const medioContacto: MedioContacto = {
        tipoContactoId: Number(formValue.tipoContacto),
        valor: String(formValue.valorContacto)
      };
      
      const profesion1Id = this.form.value.profesion1;
      const profesion2Id = this.form.value.profesion2;

      if (profesion1Id) profesionesSeleccionadas.push(+profesion1Id);
      if (profesion2Id) profesionesSeleccionadas.push(+profesion2Id);


      const profesionistaDTO: ProfesionistaRequestDTO = {
        nombre: formValue.nombre!,
        apPaterno: formValue.apellidoPaterno!,
        apMaterno: formValue.apellidoMaterno!,
        fechaNacimiento: formValue.fechaNacimiento!,
        correo: formValue.correo!,
        tipoUsuario: "PROFESIONISTA",
        password: formValue.contraseña!,
        profesionesIds: profesionesSeleccionadas!,
        zonaId: formValue.zona!,
        biografia: "Biografía temporalkkkkk",
        medioContactos: [medioContacto]
      };
      console.log(profesionistaDTO);

  
      this.authService.signupProfesional(profesionistaDTO).subscribe({
        next: res => {
          alert(res.message || 'Registro de Profesionista exitoso. Revisa tu correo.');
        },
        error: err => {
          alert(err.error?.message || 'Error al registrar profesionista');
        }
      });
  
    } else {
      const clienteDTO: ClienteRequestDTO = {
        nombre: formValue.nombre!,
        apPaterno: formValue.apellidoPaterno!,
        apMaterno: formValue.apellidoMaterno!,
        fechaNacimiento: formValue.fechaNacimiento!,
        correo: formValue.correo!,
        tipoUsuario:"cliente",
        password: formValue.contraseña!,
      };
      console.log(clienteDTO);
  
      this.authService.signup(clienteDTO).subscribe({
        next: res => {
          alert(res.message || 'Registro de Cliente exitoso. Revisa tu correo.');
        },
        error: err => {
          alert(err.error?.message || 'Error al registrar cliente');
        }
      });
    }
  }
}

  onCategoriaChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const categoriaId = selectElement.value;

    const categoriaIdNumber = Number(categoriaId);
    
    this.categoriasService.getProfesionesPorCategoria(categoriaIdNumber).subscribe(
      (profesiones) => {
        this.profesiones = profesiones;
        this.form.get('profesion1')?.enable();
        this.form.get('profesion2')?.enable();
        console.log(profesiones)
      },
      (error) => {
        console.error('Error al obtener las profesiones:', error);
      }
    );
    this.selectedProfesion1 = null;
    this.selectedProfesion2 = null;
  }

  capitalizeFirstLetter(event: any): void {
    let value = event.target.value;
    value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    event.target.value = value;
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
