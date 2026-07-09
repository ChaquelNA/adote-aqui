import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  const rotasProtegidas = ["/pets", "/cadastrar-pet"];

  const precisaLogin = rotasProtegidas.some((rota) =>
    request.nextUrl.pathname.startsWith(rota)
  );

  if (precisaLogin && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pets/:path*", "/cadastrar-pet"],
};