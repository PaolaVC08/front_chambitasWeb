import { Certificado } from "./certificado.model";
import { Contacto } from "./contacto.model";
import { Educacion } from "./educacion.model";
import { Profesion } from "./profesion.model";
import { Servicio } from "./servicio.model";
import { Zona } from "./zona.model";

export interface Profesionista {
    id: number;
    nombre: string;
    biografia: string;
    likes: number;
    mediosdeContacto: Contacto[];
    zonas: Zona[];
    roles: Profesion[];
    educaciones: Educacion[];
    certificados: Certificado[];
    servicios: Servicio[];
}