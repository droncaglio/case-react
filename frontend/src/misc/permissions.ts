// src/utils/permissions.ts
import { ROUTE_DEFINITIONS } from "@/configs/routesDefinitions";
import { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

interface DecodedToken {
  userId: number;
  isAdmin: boolean;
  email: string;
}

interface AuthCheckResult {
  authorized: boolean;
  permissionNeeded?: string;
  reason?: string;
}

export function getPermissionForCurrentRoute(
  pathname: string
): string | undefined {
  // Tentar encontrar uma rota que bata com pathname
  for (const routeKey in ROUTE_DEFINITIONS) {
    const routeDef = ROUTE_DEFINITIONS[routeKey];
    const { path } = routeDef;

    // Caso não tenha parâmetro dinâmico, match exato
    if (!path.includes(":")) {
      if (path === pathname) {
        return routeDef.permission;
      }
    } else {
      // Rota dinâmica: substituir :id por um regex que case com qualquer segmento
      const regexPath = path.replace(/:id/g, "[^/]+");
      // criar um regex para testar o pathname completo
      const regex = new RegExp(`^${regexPath}$`);
      if (regex.test(pathname)) {
        return routeDef.permission;
      }
    }
  }

  // Se não encontrar nada, retorna undefined
  return undefined;
}

export async function checkAuthorizationForRoute(
  request: NextRequest
): Promise<AuthCheckResult> {
  const pathname = request.nextUrl.pathname;
  const permissionNeeded = getPermissionForCurrentRoute(pathname);

  // Se a rota não exige permissão, consideramos autorizada por padrão.
  if (!permissionNeeded) {
    return { authorized: true };
  }

  const token = request.cookies.get("token")?.value;
  if (!token) {
    console.error("No token found");
    return { authorized: false, permissionNeeded, reason: "No token found" };
  }

  const decoded = jwtDecode<DecodedToken>(token);

  const isAdmin = decoded.isAdmin;
  const email = decoded.email;

  const cookiesStore = await cookies();

  cookiesStore.set("email", email);

  if (!isAdmin) {
    return { authorized: false, permissionNeeded, reason: "No permission" };
  }

  return { authorized: true, permissionNeeded };
}
