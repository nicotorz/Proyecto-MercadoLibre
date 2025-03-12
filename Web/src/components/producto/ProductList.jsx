import React from "react";
import Producto from './ProductComponent';
import './ProductList.css'

const ProductList = ({isLogedIn, products, productsLiked, setProductLiked}) => {
    
   
    return (
        <div className="contenedor-productListing">
            {products.length > 0 ? (
                products.map((product) => (
                    <div key={product.id} className="product-item">
                        <Producto
                            id={product.id}
                            productLogo={product.images[0]}
                            descriptionProduct={product.tittle}
                            owner={product.owner}
                            precio={product.price}
                            isLogedIn={isLogedIn}
                            productsLiked={productsLiked}
                            setProductLiked={setProductLiked}
                        />
                    </div>
                ))
            ) : (
                <p>No se encontraron productos.</p>
            )}
        </div>
    );
};

export default ProductList;