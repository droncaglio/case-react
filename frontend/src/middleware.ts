// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { checkAuthorizationForRoute } from '@/misc/permissions';
import { ROUTES } from '@/configs/routes';

export async function middleware(request: NextRequest) {
  // Rotas protegidas
  const protectedRoutes = [
    ROUTES.STUDENTS,
  ];

  let hostUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  if (process.env.NODE_ENV === 'development') {
    hostUrl = 'http://localhost:3000';
  }

  // Redirecionar de HTTP para HTTPS em produção
  if (process.env.NODE_ENV === 'production') {
    if (request.headers.get('x-forwarded-proto') === 'http') {
      // Logout e redirecionar para login
      await fetch(`${hostUrl}/api/logout`, {
        method: 'POST',
      });

      const httpsUrl = new URL(request.url);
      httpsUrl.protocol = 'https:';
      return NextResponse.redirect(httpsUrl.toString(), 308);
    }
  }

  // Verificações de token existentes
  const token = request.cookies.get('token')?.value;

  // Obter o pathname da URL solicitada
  const pathname = request.nextUrl.pathname;

  // Se não houver token e a rota for protegida, redirecionar para a página de login
  if (!token && protectedRoutes.includes(pathname)) {
    console.log('Token não encontrado. Redirecionando para a página de login...');

    // Clonar a URL de origem
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = ROUTES.LOGIN;
    loginUrl.search = ''; 
    loginUrl.searchParams.set('redirect', request.nextUrl.href);

    return NextResponse.redirect(loginUrl);
  }

  const result = await checkAuthorizationForRoute(request);

  if (!result.authorized) {
    console.log('Sem permissão para acessar a rota. Redirecionando...');

    const loginUrl = new URL(ROUTES.LOGIN, request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.href);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|favicon.ico|forgot-password|reset-password|verify-email|_next/static|_next/image|.*\\.png$).*)',
  ],
};
