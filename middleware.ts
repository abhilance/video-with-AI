import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware() {
        // Custom middleware logic
        return NextResponse.next()
    },
    {
        callbacks  : {

            authorized({req, token}) {
                const {pathname} = req.nextUrl
                if (pathname.startsWith("/api/auth") ||
                    pathname === "/login" ||
                    pathname === "/register") {
                    // Custom authorization logic
                    return true
                }
                if (pathname === "/" || pathname.startsWith("/video/")) {
                    // Custom authorization logic
                    return true
                }
                return !!token
            },
            
         
       }
    }
)
export const config = {
  matcher: ["/((?!_next/static|_next/image|/favicon.ico|public/).*)"],
}
