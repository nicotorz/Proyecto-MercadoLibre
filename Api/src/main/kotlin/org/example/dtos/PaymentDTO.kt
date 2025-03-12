package org.example.dtos

import com.fasterxml.jackson.annotation.JsonFormat
import model.Payment

class PaymentDTO (payment: Payment) {
    val name = payment.name
    val cardNumber = payment.cardNumber
    val cvv = payment.cvv
    @JsonFormat(pattern="yyyy/MM")
    val expirationDate = payment.expirationDate
}