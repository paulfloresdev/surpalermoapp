import { Paginated } from "./commons";
import { PaginatedItems } from "./responses";

//  Models
export interface User {
    id: number;
    name: string | null;
    email: string | null;
    role: string | null;
    permissions: string[] | null;
    createdAt: string | null;
    updatedAt: string | null;
}

//  Params
export interface LogInParams {
    email: string;
    password: string;
}

export interface SignUpParams {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface UpdateUserDataParams {
    name: string;
    email: string;
    role: string;
}

export interface UpdateUserPasswordParams {
    password: string;
}

//  Reponses y States
export interface AuthState {
    user: User | null;
    users: PaginatedItems<User> | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface GetUsersBody {
    search: string | undefined;
    role: string | undefined;
    per_page: number | undefined;
}

export interface GetUsersParams {
    page: number | undefined;
    body: GetUsersBody;
}