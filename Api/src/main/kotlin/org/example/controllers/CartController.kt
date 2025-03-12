package org.example.controllers

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import model.*
import org.example.bodies.CartBody
import org.example.bodies.PaymentBody
import org.example.dtos.CartDTO
import org.example.dtos.UserDTO
import service.MercadoLibreService
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.format.DateTimeFormatterBuilder

class CartController(private val mercadoLibreService: MercadoLibreService) {

    private val mapper = jacksonObjectMapper()


    fun getCart(ctx: Context) {
        val userCtx = ctx.attribute<User>("idUser")
        val userId = userCtx?.id ?: ctx.status(401).json(mapOf("message" to "Unauthorized"))

        try {
            val cart = mercadoLibreService.getCart(userId.toString())

            val cartResponse = CartDTO(cart)
            ctx.json(cartResponse)


        }catch (e: UserException){
            ctx.status(401).json(mapOf("message" to "Unauthorized: ${e.message}"))
        }

    }

    // ====================================

    fun addToCart(ctx: Context){
        val userCtx = ctx.attribute<User>("idUser")
        val userId = userCtx?.id ?: ctx.status(401).json(mapOf("message" to "Unauthorized"))
        val cartDraftDTO = ctx.bodyValidator(CartBody::class.java)
            .check(
                { it.productId.isNotBlank() }, "Title cannot be blank")
            .check(
                { it.amount > 0 }, "There are not enough stock")
            .getOrThrow { throw BadRequestResponse("Fields entered are invalid") }
        try {
            val product = mercadoLibreService.getProduct(cartDraftDTO.productId)
            if (cartDraftDTO.amount > product.stock) {
                throw BadRequestResponse("Insufficient stock available")
            }

            val cart = mercadoLibreService.updateItemCart(userId.toString(), cartDraftDTO.productId, cartDraftDTO.amount)
            ctx.json(CartDTO(cart))
        }catch (e: UserException) {
            throw NotFoundResponse("User Not Found")
        }catch (e : ProductException){
            throw NotFoundResponse("Product Not Found")
        }
    }

    // ====================================

    fun removeFromCart(ctx: Context){
        val userCtx = ctx.attribute<User>("idUser")
        val userId = userCtx?.id ?: ctx.status(401).json(mapOf("message" to "Unauthorized"))


        try {
            // obtiene el id del product desde el path
            val productId = ctx.pathParam("id")

            // Llama al servicio para eliminar el product del carrito
            val cart = mercadoLibreService.deleteItemFromCart(userId.toString(), productId)
            val cartResponse = CartDTO(cart)
            ctx.json(cartResponse)

        } catch (e: UserException) {
            ctx.status(401).json(mapOf("message" to "Unauthorized: ${e.message}"))
        } catch (e: ProductException) {
            ctx.status(400).json(mapOf("message" to "Invalid product data"))
        }

    }

    // ====================================

    fun purchaseCart(ctx: Context) {
        val userCtx = ctx.attribute<User>("idUser")
        val userId = userCtx?.id ?: ctx.status(401).json(mapOf("message" to "Unauthorized"))

        try {
            val body: PaymentBody = mapper.readValue(ctx.body())
            val payment = createPayment(body)

            mercadoLibreService.purchase(userId.toString(), payment)

            val user = mercadoLibreService.getUser(userId.toString())
            val responseDTO = UserDTO(user)

            ctx.json(responseDTO)
            ctx.status(200)

        }catch (e: UserException){
            ctx.status(401).json(mapOf("message" to "Unauthorized: ${e.message}"))
        }catch (e: PurchaseException){
            ctx.status(400).json(mapOf("message" to "Purchase error: ${e.message}"))
        }catch (e: IllegalArgumentException){
            ctx.status(400).json(mapOf("message" to (e.message ?: "Invalid payment data")))
        }
    }


    private fun createPayment(body: PaymentBody): Payment {
        val formatter = DateTimeFormatterBuilder()
            .parseCaseInsensitive()
            .appendPattern("yyyy/MM")
            .parseDefaulting(java.time.temporal.ChronoField.DAY_OF_MONTH, 1)
            .toFormatter()
            val localDate = LocalDate.parse(body.expirationDate, formatter)
            val expirationDate = localDate.atStartOfDay()

        return Payment(
            name = body.name,
            cardNumber = body.cardNumber,
            cvv = body.cvv,
            expirationDate = expirationDate
        )
    }

    private fun formatResponse(payment: Payment): Map<String, Any> {
        // Formatea la fecha en el formato "yyyy/MM"
        val formatter = DateTimeFormatter.ofPattern("yyyy/MM")
        val formattedExpirationDate = payment.expirationDate.format(formatter)

        // Construye el objeto de respuesta
        return mapOf(
            "name" to payment.name,
            "cardNumber" to payment.cardNumber,
            "cvv" to payment.cvv,
            "expirationDate" to formattedExpirationDate
        )
    }

}