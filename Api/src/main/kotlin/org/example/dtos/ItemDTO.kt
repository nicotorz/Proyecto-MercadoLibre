package org.example.dtos

import model.Item

class ItemDTO(item: Item) {
    val product = SimpleProductDTO(item.product)
    val amount = item.amount
}
