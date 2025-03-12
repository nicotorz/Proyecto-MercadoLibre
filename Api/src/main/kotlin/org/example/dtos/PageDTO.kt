    package org.example.dtos

import io.javalin.http.NotFoundResponse
import model.Product
import utilities.Page

class PageDTO() {
}

class PageProductDTO( page: Page<Product>) {
    val products = page.items.map { SimpleProductDTO (it) }
    val currentPage = page.currentPage
    val amountOfPage = page.amountOfPages
    val amountOfElements = page.amountOfElements
}
class PageProductByCategoryDTO( page: Page<Product>) {
        val products = page.items.map { SimpleProductDTO (it) }
        val currentPage = page.currentPage
        val amountOfPage = page.amountOfPages
        val amountOfElements = page.amountOfElements
}