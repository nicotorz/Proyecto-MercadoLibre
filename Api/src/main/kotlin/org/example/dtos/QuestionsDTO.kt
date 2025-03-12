package org.example.dtos

import model.Question

class QuestionsDTO(question: Question) {
    val id = question.id
    val user = SimpleUserDTO(question.user)
    val txt = question.text
    val response = question.response

}
