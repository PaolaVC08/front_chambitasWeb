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
import { Contacto } from '../../../models/contacto.model';
import { Zona } from '../../../models/zona.model';
import { Profesion } from '../../../models/profesion.model';
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
  profesiones: Profesion[] = []; 
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
    categoria: ['', Validators.required],
    profesion1: ['', Validators.required],
    profesion2: [''],
    zona: ['', Validators.required],
  });

  onTipoUsuarioChange(event: any): void {
    this.tipoUsuario = event.target.value;
  }
  onSubmit() {

     if (this.form.valid) {
      const formValue = this.form.value;
      const profesionesSeleccionadas = [];

      if (this.selectedProfesion1) {
        profesionesSeleccionadas.push(this.selectedProfesion1.id);
      }
      if (this.selectedProfesion2) {
        profesionesSeleccionadas.push(this.selectedProfesion2.id);
      }
    
        const userRequestDTO = {
        nombre: formValue.nombre,
        apPaterno: formValue.apellidoPaterno,
        apMaterno: formValue.apellidoMaterno,
        fechaNacimiento: formValue.fechaNacimiento,
        correo: formValue.correo,
        password: formValue.contraseña,
        profesionesIds: profesionesSeleccionadas,
        zona: formValue.zona,
        biografia: "jaskdajsdkajsdasdks",
      };
      const tipoCuentaTemp=formValue.tipoUsuario;
      
      if (tipoCuentaTemp=='Cuenta Profesional'){

        this.authService.signupProfesional(userRequestDTO).subscribe({
          next: res => {
            const msg = res.message || 'Registro de Profesionista exitoso. Revisa tu correo.';
            alert(msg);
          },
          error: err => {
            const errorMsg = err.error?.message ;
            alert(errorMsg);
          }
        });
      }else{
        this.authService.signup(userRequestDTO).subscribe({
          next: res => {
            const msg = res.message || 'Registro de Cliente exitoso. Revisa tu correo.';
            alert(msg);
          },
          error: err => {
            const errorMsg = err.error?.message || 'Error en el registro de Cliente';
            alert(errorMsg);
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
