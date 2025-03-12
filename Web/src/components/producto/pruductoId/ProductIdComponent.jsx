import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Template from "../../template/Template";
import ProductIdInfo from "./ProductIdInfoComponent";
import ProductIdDescription from "./ProductIdDescription";
import ProductIdCharacteristics from "./ProductIdCharacteristic";
import ProductIdRelated from "./ProductIdRelated";
import ProductIdQuestion from "./ProductIdQuestion";
import api from '../../../services/api';
import flecha from '../../../assets/flechaDer.svg'
import './ProductId.css';

const ProductId = ({isLoged}) => {
    
    const { id } = useParams();
    const [user, setUser] = useState();
    const [product, setProduct] = useState()
    const [relateds, setRelateds] = useState([])
    const [productQuestions, setProductQuestions] = useState([])
    const [productLikeds, setProductLikeds] = useState([])

  

    useEffect(() => {
        api.productId(id)
            .then(prod => {
                setProduct(prod);
                setProductQuestions(prod.question);

            })
            .catch(error => {
                console.error("Error fetching the product", error);
            });

        api.relatedProducts(id)
            .then(response => {
                setRelateds(response);
            })
            .catch(error => {
                console.error("Error fetching related products", error);
            });
        if(isLoged){
            api.getUser()
            .then(response => {
                setUser(response);
                setProductLikeds(response.likedProducts);
            })
            .catch(error => {
                console.error("Error fetching user data", error);
            });
        }
    }, [id]);

    return (
        
        <Template>
            {product?  
            <div className="productid-container">
                <div className="category-dropdown-block">
                    <p className="category-dropdown"> 
                        <Link to = "/categories" className="category-dropdown-text"> 
                            Categorias </Link> 
                        <img src={flecha}/> {product.category.name}
                    </p>
                </div>
                <ProductIdInfo productFound={product} 
                               userFound={user}
                               productsLikeds={productLikeds}
                               setProductsLikeds={setProductLikeds}/>
                <ProductIdCharacteristics characteristicProduct = {product.characteristics} />
                <ProductIdDescription descriptionProduct = {product.description} />
                <ProductIdRelated productsRelated = {relateds} 
                                  isLoged={isLoged}
                                  productsLikeds={productLikeds}
                                  setProductsLikeds={setProductLikeds}/>
                <ProductIdQuestion questions = {productQuestions}
                                   onChangeQuestions = {setProductQuestions}
                                   dueño = {product.owner.name}
                                   userFound = {user}/>
            </div>
    : <h1>loading</h1>}
        </Template>

    );

};

export default ProductId