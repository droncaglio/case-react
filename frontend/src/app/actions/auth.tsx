"use server";

import { cookies } from "next/headers";
import api from "@/services/api";
import { ActionResult } from "@/interfaces/api";
import { LoginResponseData } from "@/interfaces/auth";

export async function login(
  email: string,
  password: string
): Promise<ActionResult<void>> {
  try {
    const body = { email, password };

    const { statusCode, data, error } = await api<LoginResponseData>("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });

    console.log("Resposta da API:", statusCode, data, error);
    
    if (error) {
      // Retorne o erro e o statusCode
      return { success: false, error, statusCode };
    }

    if (statusCode === 200 && data) {
      // Supondo que o token esteja em data.data.token e o usuário em data.data.user
      const token = data.data.token;

      const cookiesStore = await cookies();

      // Armazene o token nos cookies usando nookies
      cookiesStore.set("token", token);

      console.log("Token armazenado nos cookies:", token);

      return { success: true, message: "Login bem-sucedido", statusCode };
    } else {
      // Captura a mensagem de erro da API
      const errorMessage = data?.message || error || "Falha no login";
      return { success: false, error: errorMessage, statusCode };
    }
  } catch (error: unknown) {
    console.error("Erro no login:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Erro ao fazer login";
    return { success: false, error: errorMessage, statusCode: 500 };
  }
}
