import { Entity, UpdateParams } from "./commons";
import { Programa } from "./programas";

export interface Grupo extends Entity {
    tipo: string;
    hora_inicio: string | null;
    hora_fin: string | null;
    horas_semanales: number | null;
    fecha_inicio: Date | null;
    fecha_fin: Date | null;
    nombre: string;
    desripcion: string | null;
    costo_base: number | null;
    activo: boolean | null;
    programa_id: number;
    programa: Programa | null | undefined;
}

export interface GrupoBody {
    tipo: string;
    hora_inicio: string | undefined;
    hora_fin: string | undefined;
    horas_semanales: number | undefined;
    fecha_inicio: Date | undefined;
    fecha_fin: Date | undefined;
    nombre: string;
    desripcion: string | undefined;
    costo_base: number | undefined;
    activo: boolean | undefined;
    programa_id: number;
}

export interface UpdateGrupoParams extends UpdateParams<GrupoBody> { }