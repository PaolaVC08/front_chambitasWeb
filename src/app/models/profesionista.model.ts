import { Certificado } from "./certificado.model";
import { MedioContacto } from "./MedioContacto.model";
import { Educacion } from "./educacion.model";
import { Profesion } from "./profesion.model";
import { Servicio } from "./servicio.model";
import { Zona } from "./zona.model";

export interface Profesionista{
    id:number;
    nombre: string;
    biografia:string;
    likes:number;
    mediosdeContacto: MedioContacto[];
    zonas: Zona[];
    roles: Profesion[];
    educacion: Educacion[];
    certificados: Certificado[];
    servicios: Servicio[];
}