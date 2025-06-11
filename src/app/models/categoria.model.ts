import { Profesion } from "./profesion.model";

  
  export interface Categoria {
    id: number;
    nombreCategoria: string; 
    profesiones: Profesion[];
}