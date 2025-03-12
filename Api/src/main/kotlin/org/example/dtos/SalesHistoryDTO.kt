package org.example.dtos

import com.fasterxml.jackson.annotation.JsonFormat
import model.SaleHistory

class SalesHistoryDTO(salesHistory: SaleHistory) { // GET Users simple salesHistory
    val product = SimpleProductDTO(salesHistory.product)
    val amount = salesHistory.amount
    val payment = PaymentDTO(salesHistory.payment)
    @JsonFormat(pattern="yyyy-MM-dd")
    val date = salesHistory.date
    val user = SimpleUserDTO(salesHistory.user)
}
