const { expressjwt } = require("express-jwt")
const jwtAuthz = require("express-jwt-authz")
const { expressJwtSecret } = require("jwks-rsa")

const authMiddleware = expressjwt({
    secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.JWKS_URI
    }),
    audience: process.env.AUDIENCE,
    issuer: process.env.ISSUER_BASE_URL,
    algorithms: ['RS256']
})

const createPermissionCheck = (permissions) => {
    return jwtAuthz(permissions, {
        customScopeKey: "permissions",
        customUserKey: 'auth'
    })
}

module.exports = { authMiddleware, createPermissionCheck}