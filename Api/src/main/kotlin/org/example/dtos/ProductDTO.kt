package org.example.dtos

import model.Product

class ProductDTO (product: Product) {
    val id = product.id
    val owner = SimpleUserDTO(product.owner)
    val title = product.title
    val description = product.description
    val images = product.images
    val stock = product.stock
    val price = product.price
    val shipping = product.shipping
    val characteristics = product.characteristics
    val category = product.category
    val question = product.questions.map { QuestionsDTO(it)  }
}

class SimpleProductDTO(product: Product) { // GET users simple product
    val id = product.id
    val tittle = product.title
    val description = product.description
    val price = product.price
    val images = product.images
    val owner = SimpleUserDTO(product.owner)
    val category = product.category
    val shipping = product.shipping.price
}
