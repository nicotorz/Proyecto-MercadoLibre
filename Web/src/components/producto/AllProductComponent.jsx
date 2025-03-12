import React, { useState, useEffect } from "react"
import api from '../../services/api';
import NavPage from '../navegacion/NavPageComponent'
import './AllProduct.css'
import ProductList from "./ProductList";

const AllProduct = ({isLoged}) =>{

    const [productos, setProductos] = useState([]);  
    const [pagina, setPagina] = useState(1);             
    const [totalPaginas, setTotalPaginas] = useState(0); 
    const [productsLikeds,setProductsLikeds] = useState([])
    
    useEffect(() => {
        const fetchProduct= async() =>{
            if(isLoged){
                api.getUser().then((response) => {
                    setProductsLikeds(response.likedProducts)
                })
            }
            await api.allProduct(pagina)
            .then(response => {
                    setProductos(response.products);
                    setTotalPaginas(response.amountOfPage);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            })
        }
        
        fetchProduct();
        
        
    }, [pagina]);
    
    

    return(
    <div>
        <div className="content">
           <ProductList
                products={productos}
                productsLiked={productsLikeds}
                setProductLiked={setProductsLikeds}
                isLogedIn={isLoged}
            />
        </div>
        <NavPage paginas={totalPaginas}
                 paginaActual={pagina}
                 nuevaPagina={setPagina}/>
    </div>
);

}

export default AllProduct;

