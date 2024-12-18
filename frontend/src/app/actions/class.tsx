'use server';

import { ActionResult } from '@/interfaces/api';
import {
  ListClassesResponseData,
} from '@/interfaces/class';
import api from '@/services/api';


export async function getClassesAction(): Promise<ActionResult<ListClassesResponseData>> {
  
    const { statusCode, data, error } = await api<ListClassesResponseData>(
      `/classes`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    );
  
    if (error) {
      // Retorne o erro e o statusCode
      return { success: false, error, statusCode };
    }
  
    if (statusCode === 200 && data) {
      return { success: true, message: 'Busca bem-sucedida', statusCode, data: data };
    } else {
      // Captura a mensagem de erro da API
      const errorMessage = data?.message || error || 'Falha ao buscar classes';
      return { success: false, error: errorMessage, statusCode };
    }
  }