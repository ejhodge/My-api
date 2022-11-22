import { expressjwt, GetVerificationKey } from "express-jwt";
import jwtAuthz from "express-jwt-authz";
import { expressJwtSecret } from "jwks-rsa";

export const authMiddleware = expressjwt({
    secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.JWKS_URI as string
    }) as GetVerificationKey,
    audience: process.env.AUDIENCE,
    issuer: process.env.ISSUER_BASE_URL,
    algorithms: ['RS256']
})

export const createPermissionCheck = (permissions: any) => {
    return jwtAuthz(permissions, {
        customScopeKey: "permissions",
        customUserKey: 'auth'
    })
};