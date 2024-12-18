// src/services/api.ts
import { cookies } from 'next/headers';
import { ApiOptions, ApiResponse } from '@/interfaces/api';

const baseURL = process.env.NEXT_PUBLIC_API_URL as string;
const publicRoutes = [
  '/auth/login',
];

const api = async <T>(url: string, options: ApiOptions = {}): Promise<ApiResponse<T>> => {
  const cookiesStore = await cookies();
  const storedToken = cookiesStore.get('token')?.value || '';
  const token = decodeURIComponent(storedToken);
  

    // Verifica se o corpo da requisição é FormData
    const isFormData = options.body instanceof FormData;

    const headers: HeadersInit = {
      Accept: 'application/json',
      // Não define 'Content-Type' automaticamente se for FormData
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...options.headers,
    };

    console.log('url:', url);
    console.log('options:', options);
  // Adiciona o token apenas se a URL não estiver nas rotas públicas
  if (!publicRoutes.includes(url)) {
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else {
      console.log(
        'Token não encontrado. Para rotas protegidas, é necessário um token de autenticação.',
      );

      return {
        statusCode: 401,
        error: 'Token de autenticação não encontrado',
      };
    }
  }

  try {
    console.log('Fazendo requisição para:', `${baseURL}${url}`);
    const response = await fetch(`${baseURL}${url}`, {
      ...options,
      headers,
      body: options.body,
    });

    const contentType = response.headers.get('content-type') || '';

    let responseData: T | null = null;

    // Tentar analisar a resposta como JSON se o Content-Type for adequado
    if (contentType.includes('application/json')) {
      try {
        responseData = await response.json();
      } catch {
        // Erro ao analisar JSON
        return {
          statusCode: response.status,
          error: 'Resposta não está no formato JSON válido',
        };
      }
    } else {
      // Se a resposta não for JSON, obter o texto para possíveis mensagens de erro
      const responseText = await response.text();
      console.error('Resposta não JSON recebida:', responseText);
      return {
        statusCode: response.status,
        error: 'Resposta não está no formato JSON esperado',
      };
    }

    if (!response.ok) {
      // Verificar se a resposta contém erros de validação
      const errorData = responseData as unknown as {
        message?: string;
        errors?: Record<string, string[]>;
      };

      if (errorData && errorData.errors) {
        return {
          statusCode: response.status,
          error: errorData.message || 'Erro na requisição',
          validationErrors: errorData.errors,
        };
      }

      return {
        statusCode: response.status,
        error: errorData.message || `Erro ${response.status}: ${response.statusText}`,
      };
    }

    return {
      statusCode: response.status,
      data: responseData as T,
    };
  } catch {
    return {
      statusCode: 500,
      error: 'Erro na requisição ao servidor',
    };
  }
};

export default api;
