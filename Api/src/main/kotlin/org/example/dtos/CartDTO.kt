package org.example.dtos

import model.Cart

class CartDTO(cart: Cart) {

    val user = SimpleUserDTO(cart.user)
    val items = cart.items.map { ItemDTO(it) }

}