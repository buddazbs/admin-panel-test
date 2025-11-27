export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}