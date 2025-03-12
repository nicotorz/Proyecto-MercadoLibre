package org.example.controllers

import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import model.*
import org.example.bodies.QuestionBody
import org.example.dtos.*
import service.MercadoLibreService

class ProductController(private val mercadoLibreService: MercadoLibreService, private val tokenController: TokenController) {

    fun searchProducts(ctx: Context){
       try {

           val page = ctx.queryParam("page")?.toIntOrNull() ?: 1
           val query = ctx.queryParam("query").toString()
           val productResult = mercadoLibreService.searchProducts(query, page)
           ctx.json(PageProductDTO(productResult))
       } catch ( e : PageException) {
           throw BadRequestResponse("Missing query parameter or invalid page number")
       }
    }

    fun addQuestionInProduct(ctx: Context) {
        val productId = ctx.pathParam("id")
        try{
            val user = ctx.attribute<User>("idUser") ?: throw NotFoundResponse("User Not Found")
            val questionBody = ctx.bodyValidator(QuestionBody::class.java)
                .check({ it.text.isNotEmpty() }, "Text cannot be blank")
                .getOrThrow {
                    throw BadRequestResponse("Invalid question credentials")
                }
            ctx.header(HEADER, tokenController.userToken(user))
            val product = mercadoLibreService.addQuestion(user.id,
                productId,
                questionBody.text)
             ctx.status(201).json(ProductDTO(product))
        }
        catch(e : ProductException) {
            throw NotFoundResponse("Product not found")
        }
        catch (e : QuestionException){
            throw NotFoundResponse("Question not found")
        }

    }

    fun getProductsFromUserById(ctx: Context) {
       try {
           val userId = ctx.pathParam("id")
           val page = ctx.queryParam("page")?.toIntOrNull() ?: 1
           val pageResult = (mercadoLibreService.getProductsByUser(userId, page))
           ctx.json(PageProductDTO(pageResult))
       }catch (e : PageException){
           throw NotFoundResponse("Page Not Found")
       }
    }
    
    fun getAllProducts(ctx: Context) {
        try {
            val page = ctx.queryParam("page")?.toIntOrNull() ?: 1
            val pageResult = (mercadoLibreService.getAllProducts(page))
            ctx.json(PageProductDTO(pageResult))
        }catch (e : PageException){
            throw NotFoundResponse("Page Not Found")
        }
    }

    fun getProductByID(ctx: Context) {
        val id = ctx.pathParam("id")
        try {
            val product = mercadoLibreService.getProduct(id)
            ctx.status(200).json(ProductDTO(product))
        }catch (ex: ProductException){
            throw NotFoundResponse("Product Not Found")
        }
    }

    fun getProductsRelatedByID(ctx: Context) {
        val id = ctx.pathParam("id")
        try {
            val productsRelated = mercadoLibreService.getRelatedProducts(id)
            ctx.status(200).json(productsRelated.map { SimpleProductDTO(it) })
        }
        catch (ex: ProductException){
            throw NotFoundResponse("Product Not Found")
        }

    }

    fun createProduct(ctx: Context) {
        val user = ctx.attribute<User>("idUser") ?: throw NotFoundResponse("User not found")
        val productDraftDTO = ctx.bodyValidator(DraftProduct::class.java)
            .check(
                { it.title.isNotBlank() }, "Title cannot be blank")
            .check(
                { it.description.isNotBlank() }, "Description cannot be blank")
            .check(
                { it.price > 1 }, "Price cannot be negative or 0")
            .check( {it.images.isNotEmpty() && validateTerminology(it.images)},"Not a valid image format")
            .check(
                { it.stock >= 1 }, "The Stock cannot be negative")
            .check(
                { it.shipping.price >= 0 }, "The Shipping price cannot be negative")
            .check(
                { it.characteristics.isNotEmpty() }, "Characteristics cannot be blank")
            .check(
                { it.category.name.isNotBlank() && it.category.id.isNotBlank()}, "Category name cannot be blank")
            .getOrThrow { throw BadRequestResponse("Fields entered are invalid") }
        ctx.header(HEADER, tokenController.userToken(user))

        validateIfExistCategory(productDraftDTO.category)
        val newProduct = mercadoLibreService.addProduct(user.id, productDraftDTO)
        ctx.json(ProductDTO(newProduct))
    }

    private fun validateTerminology(imageList: MutableList<String>) : Boolean {
        val listEnd = listOf(".jpg", ".jpeg", ".png")
        val listStart = listOf("https://", "http://", "www.")
        return imageList.all { image ->listStart.any { startExt -> image.startsWith(startExt) }
                && listEnd.any { endExt -> image.endsWith(endExt) }
        }
    }

    private fun validateIfExistCategory(category : Category){
        if(!mercadoLibreService.getAllCategories().any { cat -> cat.name.equals(category.name) && cat.id.equals(category.id)}){
            throw BadRequestResponse("Category not found")
        }
    }

    fun updateProductID(ctx: Context) {
        val user = ctx.attribute<User>("idUser") ?: throw NotFoundResponse("User not found")
        val productDraftDTO = ctx.bodyValidator(DraftProduct::class.java)
            .check(
                { it.title.isNotBlank() }, "Title cannot be blank")
            .check(
                { it.description.isNotBlank() }, "Description cannot be blank")
            .check(
                { it.price > 1 }, "Price cannot be negative or 0")
            .check(
                { it.images.isNotEmpty() && validateTerminology(it.images)}, "The Product has no images")
            .check(
                { it.stock >= 1 }, "The Stock cannot be negative")
            .check(
                { it.shipping.price >= 0 }, "The Shipping price cannot be negative")
            .check(
                { it.characteristics.isNotEmpty()  }, "Characteristics cannot be blank")
            .check(
                { it.category.name.isNotBlank() && it.category.id.isNotBlank() }, "Category name cannot be blank")
            .getOrThrow { throw BadRequestResponse("Fields entered are invalid") }
        val productId = ctx.pathParam("id")
        ctx.header(HEADER, tokenController.userToken(user))
        try {
            validateIfExistCategory(productDraftDTO.category)
            val updateProduct = mercadoLibreService.editProduct(user.id, productId, productDraftDTO)
            ctx.json(SimpleProductDTO(updateProduct))
        }catch (e : UserException){
            throw BadRequestResponse("User Not Found")
        }catch (e : ProductException){
            throw BadRequestResponse("Product Not Found or you not the owner of the product")
        }
    }

    fun likeAProductID(ctx: Context) {
        val productId = ctx.pathParam("id")
        val user = ctx.attribute<User>("idUser") ?: throw NotFoundResponse("User not found")
        ctx.header(HEADER, tokenController.userToken(user))
        try{
            val updateUser = mercadoLibreService.toggleLike(user.id, productId)
            ctx.json(UserDTO(updateUser))
        }
        catch(e : ProductException){
            throw  NotFoundResponse("Product Not Found")
        }
    }

    fun addAnswerInProductID(ctx: Context) {
        val productId = ctx.pathParam("id")
        val questionId = ctx.pathParam("id_q")
        try{
            val user = ctx.attribute<User>("idUser") ?: throw NotFoundResponse("User Not Found")
            val questionBody = ctx.bodyValidator(QuestionBody::class.java)
                .check({ it.text.isNotEmpty() }, "Text cannot be blank")
                .getOrThrow {
                    throw BadRequestResponse("Invalid answer credentials")
                }
            ctx.header(HEADER, tokenController.userToken(user))
            val product = mercadoLibreService.addAnswer(user.id, productId, questionId ,questionBody.text)
            ctx.json(ProductDTO(product))
        }
        catch(e : ProductException) {
            throw NotFoundResponse("Product not found")
        }
        catch (e : QuestionException){
            throw NotFoundResponse("Question not found")
        }
    }

}
