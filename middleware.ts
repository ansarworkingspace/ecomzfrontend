// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
  exp: number;
  userId?: string;
  email?: string;
  [key: string]: any;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/signup"];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Get token from cookies
  const token = request.cookies.get("authToken")?.value;

  // If no token and trying to access protected route
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If token exists, verify and handle authentication
  if (token) {
    try {
      // Decode the JWT token
      const decodedToken: DecodedToken = jwtDecode(token);

      // Check if token is expired
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        // Token expired, clear cookie and redirect to login
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("authToken");
        return response;
      }

      // Role-based access control for dashboard routes
      if (pathname.startsWith("/dashboard")) {
        if (decodedToken.role !== "admin") {
          // Non-admin users accessing dashboard - redirect to 403
          return NextResponse.redirect(new URL("/403", request.url));
        }
      }

      // Redirect authenticated users away from login/signup pages
      if (pathname === "/login" || pathname === "/signup") {
        // Redirect based on role
        if (decodedToken.role === "admin") {
          return NextResponse.redirect(
            new URL("/dashboard/products/list", request.url)
          );
        } else {
          return NextResponse.redirect(new URL("/products", request.url));
        }
      }
    } catch (error) {
      // Invalid token, clear cookie and redirect to login
      console.error("Invalid token:", error);
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("authToken");
      return response;
    }
  }

  // Allow request to continue
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
