package org.example.dtos

import model.User


class UserDTO (user: User) {
    val id = user.id
    val name = user.name
    val email = user.email
    val image = user.image
    val purchaseHistory = user.purchaseHistory.map { PurchaseHistoryDTO(it) }
    val products = user.products.map { SimpleProductDTO(it) }
    val likedProducts = user.likedProducts.map { SimpleProductDTO(it) }
    val salesHistory = user.salesHistory.map { SalesHistoryDTO(it)}
}

class SimpleUserDTO (user: User) {
    val id = user.id
    val name = user.name
    val email = user.email
    val image = user.image
}