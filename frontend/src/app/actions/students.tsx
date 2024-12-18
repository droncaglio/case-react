"use server";

import { ActionResult } from "@/interfaces/api";
import {
  ListStudentsResponseData,
  GetStudentsParams,
  UpsertStudentResponse,
  DeleteStudentResponse,
} from "@/interfaces/student";
import api from "@/services/api";
import { cookies } from "next/headers";

export async function getStudentsAction(
  params: GetStudentsParams = {}
): Promise<ActionResult<ListStudentsResponseData>> {
  const { q = "", page = 1 } = params;
  const query = new URLSearchParams();
  if (q) query.set("q", q);
  query.set("page", page.toString());

  const { statusCode, data, error } = await api<ListStudentsResponseData>(
    `/students?${query.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (error) {
    // Retorne o erro e o statusCode
    return { success: false, error, statusCode };
  }

  if (statusCode === 200 && data) {
    return {
      success: true,
      message: "Busca bem-sucedida",
      statusCode,
      data: data,
    };
  } else {
    // Captura a mensagem de erro da API
    const errorMessage = data?.message || error || "Falha ao buscar estudantes";
    return { success: false, error: errorMessage, statusCode };
  }
}

// Buscar estudante pelo id
export async function getStudentAction(
  id: number
): Promise<ActionResult<UpsertStudentResponse["data"]>> {
  const { statusCode, data, error } = await api<UpsertStudentResponse>(
    `/students/${id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (error) {
    return { success: false, error, statusCode };
  }

  if (statusCode === 200 && data) {
    return {
      success: true,
      message: "estudante obtido com sucesso",
      statusCode,
      data: data.data,
    };
  } else {
    const errorMessage = data?.message || error || "Falha ao obter o estudante";
    return { success: false, error: errorMessage, statusCode };
  }
}

export async function createStudentAction(
  payload: FormData // Alterado para aceitar FormData
): Promise<ActionResult<UpsertStudentResponse>> {
  const response = await api<UpsertStudentResponse>("/students", {
    method: "POST",
    body: payload, // Envia FormData
  });

  if (response.error) {
    return {
      success: false,
      error: response.error,
      statusCode: response.statusCode,
    };
  }

  return {
    success: true,
    data: response.data,
    message: "Cadastrado com sucesso",
    statusCode: response.statusCode,
  };
}

export async function updateStudentAction(
  id: number,
  payload: FormData // Alterado para aceitar FormData
): Promise<ActionResult<UpsertStudentResponse>> {
  const response = await api<UpsertStudentResponse>(`/students/${id}`, {
    method: "PUT",
    body: payload, // Envia FormData
  });

  if (response.error) {
    return {
      success: false,
      error: response.error,
      statusCode: response.statusCode,
    };
  }

  return {
    success: true,
    data: response.data,
    message: "Atualizado com sucesso",
    statusCode: response.statusCode,
  };
}

export async function deleteStudentAction(
  id: number
): Promise<ActionResult<DeleteStudentResponse>> {
  const { statusCode, data, error } = await api<DeleteStudentResponse>(
    `/students/${id}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (error) {
    return { success: false, error, statusCode };
  }

  if (statusCode === 200) {
    return { success: true, message: "Excluído com sucesso", statusCode };
  } else {
    const errorMessage = data?.message || error || "Falha ao excluir estudante";
    return { success: false, error: errorMessage, statusCode };
  }
}

export async function importStudentAction(
  payload: FormData
): Promise<ActionResult<{ message: string }>> {
  const cookiesStore = await cookies();

  const userEmail = cookiesStore.get("email")?.value || "";
  payload.append("email", userEmail);

  if (!userEmail) {
    return {
      success: false,
      error: "Usuário não autenticado",
      statusCode: 401,
    };
  }

  const response = await api<{ message: string }>("/students/import", {
    method: "POST",
    body: payload,
  });

  if (response.error) {
    return {
      success: false,
      error: response.error,
      statusCode: response.statusCode,
    };
  }

  return {
    success: true,
    message: "Importação realizada com sucesso",
    statusCode: response.statusCode,
  };
}
