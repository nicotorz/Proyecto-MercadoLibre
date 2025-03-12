package org.example.roles

import io.javalin.security.RouteRole

enum class Roles: RouteRole {
    ANYONE,
    USER
}