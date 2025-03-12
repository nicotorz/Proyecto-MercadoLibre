import { useEffect, useState } from "react";
import api from '../../services/api';
import Template from "../template/Template";
import { useParams } from "react-router-dom";
import NavPage from "../navegacion/NavPageComponent";
import photo from '../../assets/defaultProfile.svg';
import './UserById.css';
import ProductList from "../producto/ProductList";

const UserById = ({isLoged}) => {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [fetchedProducts, setFetchedProducts] = useState([]);
    const [page, setPage] = useState(1);             
    const [amountOfPage, setAmountOfPage] = useState(0); 
    const [likedProducts, setLikedProducts] = useState([]);

    useEffect(() => {
        api.getUserById(id).then(user => {
            setUser(user);
        });
    }, [id]);

    useEffect(() => {
        const fetchProduct= async() =>{
            if(isLoged){
                await api.getUser()
                .then(response =>{
                    setLikedProducts(response.likedProducts)
                });
            }
            await api.getUserProducts(id, page).then(response => {
                setFetchedProducts(response.products);
                setAmountOfPage(response.amountOfPage);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            })
        }

        fetchProduct();
    }, [page]);
    
    return (
        <>
            <Template>
            <div className="userProducts-container">
                <div className="userById-title">
                    <img 
                        className="userProfile-icon" 
                        src={photo} 
                        alt="User profile"
                    />
                    <h2 className="userByIdName">{user.name}</h2>
                </div>
                <ProductList
                    products={fetchedProducts}
                    productsLiked={likedProducts}
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
};

export default UserById;
