import { Categoria } from "./categoria.model";

export interface Servicio{
    id: number;
    nombre: string;
    descripcion: string;
    categoria: Categoria;
    imagenesBase64: string[];
}