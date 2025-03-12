package org.example.controllers

import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import model.DraftNewUser
import model.User
import model.UserException
import org.example.bodies.LoginBody
import org.example.dtos.SimpleUserDTO
import org.example.dtos.UserDTO
import service.MercadoLibreService

class UserController(private val mercadoLibreService: MercadoLibreService, private val tokenController: TokenController) {

    fun getUser(ctx: Context) {
        val user = ctx.attribute<User>("idUser") ?: throw NotFoundResponse("User not found")
        ctx.json(UserDTO(user))
    }

    fun getUsersByID(ctx: Context) {
        val userId = ctx.pathParam("id")
        try {
            val user = mercadoLibreService.getUser(userId)
            ctx.status(200).json(SimpleUserDTO(user))
        } catch (error:UserException) {
            throw NotFoundResponse("User not found")
        }
    }

    fun registerUser(ctx: Context) {
        val userDraftDTO = ctx.bodyValidator(DraftNewUser::class.java)
            .check({it.name.isNotBlank() }, "Name cannot be blank")
            .check(
                { it.email.isNotBlank() && it.email.contains("@") },
                "A valid email must be entered"
            )
            .check({ it.password.isNotBlank() }, "Password cannot be blank")
            .check({ it.image.isNotBlank()&& validateUserImage(it.image)},"Not a valid image format")
            .getOrThrow { throw BadRequestResponse("Invalid registration data") }

        try {
            val newUser = mercadoLibreService.registerNewUser(userDraftDTO)
            ctx.header(HEADER, tokenController.userToken(newUser))
            ctx.json(UserDTO(newUser))
        } catch (e: UserException) {
            throw BadRequestResponse("Email already on use")
        }
    }

    fun loginUser(ctx: Context) {
        val userLoginDTO = ctx.bodyValidator(LoginBody::class.java)
            .check({ it.email.isNotEmpty() }, "email cannot be blank")
            .check({ it.password.isNotEmpty() }, "Password cannot be blank")
            .getOrThrow { throw BadRequestResponse("Invalid login credentials") }
        try {
            val user = mercadoLibreService.getUser(userLoginDTO.email, userLoginDTO.password)
            ctx.header(HEADER, tokenController.userToken(user))
            ctx.json(UserDTO(user))
        } catch (e: UserException) {
            throw BadRequestResponse("Invalid login credentials")
        }
    }

    fun validateUserImage(image: String) : Boolean {
        val listEnd = listOf(".jpg", ".jpeg", ".png")
        val listStart = listOf("https://", "http://", "www.")
        return listStart.any { extention -> image.startsWith(extention) } &&
               listEnd.any   { extention -> image.endsWith(extention) }
    }
}