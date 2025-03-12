package org.example.dtos

import com.fasterxml.jackson.annotation.JsonFormat
import model.PurchaseHistory

class PurchaseHistoryDTO(purchaseHistory: PurchaseHistory) {  // GET users simple purchaseHistory
    val items = purchaseHistory.items.map { ItemDTO(it) }
    val payment = PaymentDTO(purchaseHistory.payment)
    @JsonFormat(pattern="yyyy-MM-dd")
    val date = purchaseHistory.date // YYY/MMM/DDD
}