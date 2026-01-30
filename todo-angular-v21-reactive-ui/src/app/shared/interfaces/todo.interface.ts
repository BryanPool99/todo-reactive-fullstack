export interface Todo {
  id: number;
  task: string;
  is_completed: boolean;
  created_at: string;
}

export interface MetadataResponse {
  limit: number;
  offset: number;
  totalElements: number;
}

export interface TodoResponse {
  result: boolean;
  data: Todo[];
  metadata: MetadataResponse;
  timestamp: string;
}

export interface ParamsTodoRetrieve {
  filter: string;
  sort?: string;
  limit?: number;
  offset?: number;
}

export interface TodoRequest {
  task: string;
  is_completed: boolean;
}