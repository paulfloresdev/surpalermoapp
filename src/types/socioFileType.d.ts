import { Entity } from "./commons";

export interface SocioFileType extends Entity {
    name: string;
}

export interface SocioFileTypeBody {
    name: string;
}

export interface UpdateSocioFileTypeParams {
    id: number;
    body: SocioFileTypeBody;
}
