import { useEffect, useState } from "react";
import api from '../../services/api';
import Template from "../template/Template";
import CategoryItem from "./CategoryItem";
import "./categories.css"
import categoryIcons from "./CategoryIcons";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const Categories = () => {

    const [loading, setLoading] = useState();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setLoading(true);
        api.allCategories()
            .then(response => {
                setCategories(response);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            }).finally(() => {
                setLoading(false);
            });
    }, []); 

    return (
        <>
            <Template>
            <div className="category-container">
                <div className="category-title">
                    <h2>Categories</h2>
                </div>
                <div className="content-categoryProd">
                    <div className="contenedor-categoryProd">
                        {loading ? ( 
                            Array.from({length: 22}).map((_, index) => ( // usar categories.length en vez de el 22 hardcodeado?? 
                                <Skeleton key={index} height={106} width={212}/>
                            ))
                        ) : (
                            categories.map(category => ( 
                                <div className="category-item" key={category.id}>
                                    <CategoryItem 
                                        icon={categoryIcons[category.id]} 
                                        categoryName={category.name}
                                        categoryId={category.id}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            </Template>
        </>
    );
}

export default Categories;

