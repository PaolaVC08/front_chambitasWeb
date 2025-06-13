import { MedioContacto } from "./MedioContacto.model";

export interface ProfesionistaRequestDTO {
    nombre: string;
    apPaterno: string;
    apMaterno: string;
    fechaNacimiento: string;
    correo: string;
    tipoUsuario: string;
    password: string;
    profesionesIds: number[];
    zonaId: string;
    biografia: string;
    medioContactos: MedioContacto[];
  }
  