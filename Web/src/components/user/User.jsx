import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Template from "../template/Template";
import api from '../../services/api';
import { getPurchaseHistoryProducts, getSalesHistoryProducts } from "../../utils/utils";
import './User.css';
import ProductList from "../producto/ProductList";

const User = ({setLogout, isLoged}) => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [productos, setFetchedProducts] = useState([]);
    const [productsLikeds, setProductsLikeds] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('myProducts');


    useEffect(() => {
        const fetchUser = async ()=>{
        await api.getUser().then(user => {
            setUser(user);
            setFetchedProducts(user.products);
            setProductsLikeds(user.likedProducts);
           })
        
        }
        fetchUser();
        
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        setLogout(false)
        navigate('/login');
    };

    const categoryMap = {
        myProducts: user.products || [],
        likedProducts: user.likedProducts || [],
        purchaseHistory: getPurchaseHistoryProducts(user.purchaseHistory || []),
        sales: getSalesHistoryProducts(user.salesHistory || []),
    };

    const handleCategoryChange = async (category) => {
        setSelectedCategory(category);
        setFetchedProducts(categoryMap[category]);
    };

    return (
        <>
        <Template>
        <div className="user-contenedor">
            <div className="user-content">
                <div className="user-header">
                    <h2 className="userName">{user.name}</h2>
                    <div className="userFunctionality">
                        <Link className="addProduct" to="/newProduct">+ Agregar producto</Link>
                        <button className="userLogout" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                <li className="user-info">
                    <ul className={`user-likedProducts ${selectedCategory === 'likedProducts' ? 'active' : ''}`} 
                        onClick={() => handleCategoryChange('likedProducts')}>
                        <span>Liked</span>
                    </ul>
                    <ul className={`user-sales ${selectedCategory === 'sales' ? 'active' : ''}`} 
                        onClick={() => handleCategoryChange('sales')}>
                        <span>Sales</span>
                    </ul>
                    <ul className={`user-purchases ${selectedCategory === 'purchaseHistory' ? 'active' : ''}`} 
                        onClick={() => handleCategoryChange('purchaseHistory')}>
                        <span>Purchases</span>
                    </ul>
                    <ul className={`user-myProducts ${selectedCategory === 'myProducts' ? 'active' : ''}`} 
                        onClick={() => handleCategoryChange('myProducts')}>
                        <span>My Products</span>
                    </ul>
                </li>
                <ProductList 
                     products={productos}
                     productsLiked={productsLikeds}
                     setProductLiked={setProductsLikeds}
                     isLogedIn={isLoged}
                />
            </div>
        </div>
        </Template>
        </>
    );
};

export default User;
