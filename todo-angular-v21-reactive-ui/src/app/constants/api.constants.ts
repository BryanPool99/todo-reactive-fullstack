import { environment } from "../../environments/environment";

export const URL_BASE = `${environment.TODO_URL_API}`;
export const API_VERSION = '/api/v1';
export const URL_API = `${URL_BASE}${API_VERSION}`;
export const URL_API_TODO = `${URL_API}/todo`;