import { Entity, Paginated } from "./commons";
import { SocioFileType } from "./socioFileType";

export interface SocioFile extends Entity {
    name: string;
    path: string;
    socio_id: number;
    socio_file_type_id: number;
    socio_file_type: SocioFileType
    created_at?: string;
    updated_at?: string;
}

export interface SocioFileBody {
    name: string;
    socio_id: number;
    socio_file_type_id: number;
    file: File;
}

export interface SearchSocioFilesBody extends Paginated {
    per_page?: number;
    search?: string;
    socio_id?: number;
    socio_file_type_id?: number;
}

export interface SearchSocioFilesParams {
    page?: number;
    body: SearchSocioFilesBody;
}
