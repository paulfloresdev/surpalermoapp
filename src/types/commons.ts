import { PaginatedItems } from "./responses";

export interface Entity {
    id: number;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export interface CrudState<T> {
    data: T | T[] | PaginatedItems<T> | null;
    loading: boolean;
    error: string | null;
}

export interface ItemState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export interface FormState<T> {
    data: Partial<T> | null;
    loading: boolean;
    error: string | null;
}


export interface PaginatedState<T> {
    data: PaginatedItems<T> | null;
    loading: boolean;
    error: string | null;
}

export interface ListState<T> {
    data: T[] | null;
    loading: boolean;
    error: string | null;
}

export interface Paginated {
    order: undefined | number;
    per_page: undefined | number;
}

export interface PaginatedParams {
    page: undefined | number;
    body: Paginated;
}

export interface UpdateParams<T> {
    id: string;
    body: T;
}

export type KeyUpdate<T> = {
    [K in keyof T]: { key: K; value: T[K] }
}[keyof T];
