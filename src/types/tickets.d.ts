import { Entity, Excel, Paginated } from "./commons";
import { Mutualista } from "./mutualistas";

export interface Ticket extends Entity {
    fecha_visita: string;
    no_ticket: string | null;
    no_factura: string | null;
    observaciones: string | null;
    socio_id: number | null;
    grupo_id: number | null;
    mutualista_convenio_id: number | null;
    socio: Socio | null | undefined;
    grupo: Grupo | null | undefined;
    mutualista: Mutualista | null | undefined;
}

export interface SearchTicketsBody extends Paginated, Excel {
    search: string | nullable;
    socio_id: number;
}

export interface SearchTicketsParams {
    page: number | undefined;
    body: SearchSocioBody;
}

export interface StoreTicketBody {
    fecha_visita: string[];
    no_ticket: string | undefined;
    observaciones: string | undefined;
    socio_id: number;
    grupo_id: number;
    mutualista_convenio_id: number;
}

export interface UpdateTicketBody {
    fecha_visita: string;
    no_ticket: string | undefined;
    no_factura: string | undefined;
    observaciones: string | undefined;
    grupo_id: number;
    mutualista_convenio_id: number;
}

export interface UpdateTicketParams {
    id: number;
    body: UpdateTicketBody;
}

export interface FacturarByTicketBody {
    no_factura: string;
    no_tickets: string[];
}

export interface FacturarByIdBody {
    no_factura: string;
    ids: number[];
}

export interface AsignarNoTicketBody {
    no_ticket: string;
    ids: number[];
}

