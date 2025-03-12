package org.example

import data.initSystem
import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder.*
import org.example.controllers.*
import org.example.roles.Roles

class Api {
    private val app: Javalin
    private val mercadoLibre = initSystem()
    private val tokenController = TokenController(mercadoLibre)
    private val userController = UserController(mercadoLibre, tokenController)
    private val categoryController = CategoriesController(mercadoLibre)
    private val productController = ProductController(mercadoLibre, tokenController)
    private val cartController = CartController(mercadoLibre)
    init {
        app = Javalin.create { config ->
            config.http.defaultContentType = "application/json"
            config.bundledPlugins.enableCors{cors ->
                cors.addRule{ it ->
                    it.anyHost();
                    it.allowCredentials = true;
                    it.exposeHeader(HEADER);
                }
            }
            config.router.apiBuilder {
                path("/user") {
                    get (userController::getUser, Roles.USER)
                }
                path("/user/{id}") {
                    get (userController::getUsersByID, Roles.ANYONE)
                }
                path("/register") {
                    post (userController::registerUser, Roles.ANYONE)
                }
                path("/login") {
                    post (userController::loginUser, Roles.ANYONE)
                }
                path("/categories") {
                    get (categoryController::getAllCategories, Roles.ANYONE)
                }
                path("/categories/{id}") {
                    get (categoryController::getCategoryByID, Roles.ANYONE)
                }
                path("/products"){
                    get (productController::getAllProducts, Roles.ANYONE)
                    post (productController::createProduct, Roles.USER)
                }
                path("/products/{id}") {
                    get (productController::getProductByID, Roles.ANYONE)
                    put (productController::updateProductID, Roles.USER)
                }
                path("/products/{id}/related"){
                    get (productController:: getProductsRelatedByID, Roles.ANYONE)
                }
                path("/products/{id}/like"){
                    put (productController:: likeAProductID, Roles.USER)
                }
                path("/products/{id}/question"){
                    post (productController:: addQuestionInProduct, Roles.USER)
                }
                path("/products/{id}/question/{id_q}"){
                    put (productController:: addAnswerInProductID, Roles.USER)
                }
                path("/search"){
                    get (productController:: searchProducts, Roles.ANYONE)
                }
                path("/user/{id}/products") {
                    get (productController::getProductsFromUserById, Roles.ANYONE)
                }
                path("/cart"){
                    get(cartController::getCart, Roles.USER)
                    put(cartController::addToCart, Roles.USER)
                    delete("{id}", cartController::removeFromCart, Roles.USER)
                }

                path("/purchase"){
                    post(cartController::purchaseCart, Roles.USER)
                }
            }
        }
        app.beforeMatched(tokenController::validate)
    }
    fun start(port: Int = 7070) {
        app.start(port)
    }

}
fun main() {
    Api().start()
}