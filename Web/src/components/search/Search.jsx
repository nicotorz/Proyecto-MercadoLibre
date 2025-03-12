import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import Template from "../template/Template";
import ProductList from "../producto/ProductList";
import api from '../../services/api';
import './Search.css'

const Search = ({isLoged}) => {

    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [soughtProducts, setsoughtProducts] = useState([]);
    const [productsLikeds, setProductsLikeds] = useState([]);

    useEffect(() => { 
        api.search(query)
            .then((response) => {
                setsoughtProducts(response.products)
            })
    }, [query])

    useEffect(() => {
        if(isLoged){
            api.getUser()
            .then((response) => {
                setProductsLikeds(response.likedProducts)
            })
        }
    }, [isLoged]);

    return (
        <>
        <Template>
        <div className="search">
            <div className="search-header">
                <p className="query">
                    Search: {query}
                </p>
            </div>
            <div className="content-soughtProducts">
            <ProductList
                products={soughtProducts}
                productsLiked={productsLikeds}
                setProductLiked={setProductsLikeds}
                isLogedIn={isLoged}
            />
            </div>
        </div>
        </Template>
        </>
    )

}

export default Search