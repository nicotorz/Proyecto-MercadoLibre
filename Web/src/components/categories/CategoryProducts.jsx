import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import categoryIcons from "./CategoryIcons";
import NavPage from '../navegacion/NavPageComponent';
import Template from "../template/Template";
import ProductList from '../producto/ProductList';
import './CategoryProducts.css';

const CategoryProducts = ({isLoged}) => {
    const { id } = useParams();
    const [amountOfPage, setAmountOfPage] = useState(0);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [categoryInfo, setCategoryInfo] = useState(null);
    const [productsLikeds, setLikedProducts] = useState([]);

    useEffect(() => {
        const fetchProductLiked= async() =>{
        if(isLoged){
            await api.getUser()
                .then(response =>{
                    setLikedProducts(response.likedProducts)
                });
        }

        await api.getProductsByCategory(id, page)
            .then(response => {
                setProducts(response.products);
                setAmountOfPage(response.amountOfPage);
                if (response.products.length > 0) {
                    const { category } = response.products[0];
                    setCategoryInfo(category);
                }
            })
        }
        fetchProductLiked();

    }, [id, page]);

    return (
        <>
            <Template>
            {categoryInfo && (
                <div className="category-header">
                    <div className="category-icon-container">
                        <img 
                            src={categoryIcons[categoryInfo.id]} 
                            alt={categoryInfo.name} 
                            className="category-image" 
                        />
                    </div>
                    <p className="category-name">
                        {categoryInfo.name.charAt(0).toUpperCase() + categoryInfo.name.slice(1)}
                    </p>
                </div>
            )}
            <div className="content-categoryProducts">
                <ProductList
                    products={products}
                    productsLiked={productsLikeds}
                    setProductLiked={setLikedProducts}
                    isLogedIn={isLoged}
                />
            </div>
            <NavPage paginas={amountOfPage}
                 paginaActual={page}
                 nuevaPagina={setPage}/>
            </Template>
        </>
    );
}

export default CategoryProducts;

