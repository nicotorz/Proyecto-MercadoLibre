import './ProductIdRelated.css';
import ProductList from "../ProductList";

const ProductIdRelated = ({productsRelated, isLoged, productsLikeds, setProductsLikeds}) => {
    return(
        <div>
            <div className="products-related-block">
               <h2 className="productid-title"> Productos relacionados </h2>
               <hr className="product-id-line"/>
               <div className="products-related">
               <ProductList
                  products={productsRelated}
                  productsLiked={productsLikeds}
                  setProductLiked={setProductsLikeds}
                  isLogedIn={isLoged}
                />
              </div>
            </div>
        </div>
    );
    
};
    
export default ProductIdRelated