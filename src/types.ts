export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: Todo | Todo[];
}