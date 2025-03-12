package org.example.controllers

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTCreator
import com.auth0.jwt.algorithms.Algorithm
import io.javalin.http.Context
import io.javalin.http.UnauthorizedResponse
import javalinjwt.JWTGenerator
import javalinjwt.JWTProvider
import model.User
import service.MercadoLibreService
import org.example.roles.Roles

val HEADER = "Authorization"

class UserGenerator : JWTGenerator<User> {
    override fun generate (user: User, alg: Algorithm) : String {
        val token: JWTCreator.Builder = JWT.create()
            .withClaim("id", user.id)
        return token.sign(alg)
    }
}
class TokenController(private val mercadoLibreService: MercadoLibreService) {
    private val algorithm = Algorithm.HMAC256("very_secret")
    private val verifier = JWT.require(algorithm).build()
    private val generator = UserGenerator()
    private val provider = JWTProvider(algorithm, generator, verifier)

    fun userToken(user: User): String {
        return provider.generateToken(user)
    }

    fun tokenToUser(token: String): User {
        val validateToken = provider.validateToken(token)
        try {
            val userId = validateToken.get().getClaim("id").asString()
            return mercadoLibreService.getUser(userId)
        } catch (error: Exception) {
            throw UnauthorizedResponse("User not authorized")
        }

    }

    fun validate(ctx: Context) {
        val header = ctx.header(HEADER)
        when {
                ctx.routeRoles().contains(Roles.ANYONE) -> return
                header == null -> {
                    throw UnauthorizedResponse("Missing or invalid Authorization header")
                } else -> {
                        val user = tokenToUser(header)
                        ctx.attribute("idUser", user)
                        return
                    }
            }
    }
}
