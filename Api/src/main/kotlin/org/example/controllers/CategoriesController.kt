package org.example.controllers

import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import model.CategoryException
import model.PageException
import org.example.dtos.PageProductByCategoryDTO
import service.MercadoLibreService

class CategoriesController(private val mercadoLibreService: MercadoLibreService) {

    fun getAllCategories(ctx: Context) {
        ctx.json(mercadoLibreService.getAllCategories())
    }

    fun getCategoryByID(ctx: Context) {
        val id = ctx.pathParam("id")
        try{
            val page = ctx.queryParam("page")?.toIntOrNull() ?: 1
            mercadoLibreService.getCategory(id)
            val categoryByID = PageProductByCategoryDTO(mercadoLibreService.getProductsByCategory(id, page))
            ctx.status(200).json(categoryByID)
        }
        catch (e : CategoryException) {
            throw NotFoundResponse("Category not found")
        }
        catch(e : PageException) {
            throw NotFoundResponse("Page not found")
        }
    }
}