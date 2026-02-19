import { PaginatedItems } from "./responses";

export interface Entity {
    id: number;
    created_at: Date | null;
    updated_at: Date | null;
}

export interface CrudState<T> {
    data: T | T[] | PaginatedItems<T> | null;
    message: string | null;
    loading: boolean;
    error: string | null;
    indexSuccess: boolean | null;
    storeSuccess: boolean | null;
    showSuccess: boolean | null;
    updateSuccess: boolean | null;
    destroySuccess: boolean | null;
}

export interface ItemState<T> {
    data: T | null;
    message: string | null;
    loading: boolean;
    error: string | null;
    storeSuccess: boolean | null;
    showSuccess: boolean | null;
    updateSuccess: boolean | null;
    destroySuccess: boolean | null;
}

export interface FormState<T> {
    data: Partial<T> | null;
    loading: boolean;
    error: string | null;
}


export interface PaginatedState<T> {
    data: PaginatedItems<T> | null;
    message: string | null;
    loading: boolean;
    error: string | null;
    indexSuccess: boolean | null;
}

export interface ListState<T> {
    data: T[] | null;
    message: string | null;
    loading: boolean;
    error: string | null;
    indexSuccess: boolean | null;
}

export interface Response<T> {
    data: T;
    message: string | null;
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

export interface ControlledModal {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    setShouldRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Excel {
    excel?: boolean | undefined;
}

export interface ExcelSearchBody extends Paginated, Excel {
    search: undefined | string;
}

export interface ExcelSearchParams {
    page: undefined | number;
    body: ExcelSearchBody;
}