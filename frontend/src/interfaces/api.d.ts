export interface ApiOptions extends RequestInit {
  headers?: Record<string, string>;
  method?: string;
  body?: BodyInit | null;
}

export interface ApiResponse<T> {
  statusCode: number;
  data?: T;
  error?: string;
  validationErrors?: Record<string, string[]>;
}

export interface ActionResult<T> {
  success: boolean;
  message?: string;
  error?: string;
  statusCode?: number;
  data?: T;
}
