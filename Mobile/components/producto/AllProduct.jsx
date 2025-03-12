import { useEffect, useState, useContext } from "react";
import { View,  StyleSheet } from 'react-native';
import ProdctList from './ProductList';
import api from '@/services/api';
import { AuthContext } from '../../hooks/authContext';

const AllProduct = () =>{

    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [productos, setProductos] = useState([]);  
    const [pagina, setPagina] = useState(1);
    const [productsLikeds,setProductsLikeds] = useState([]);

    useEffect(() => {
        const fetchProduct = async (pagina) => {
            try {
                const response = await api.allProduct(pagina);
                setProductos(prev => [...prev , ...response.products]);
                setLoading(false);
                setProductsLikeds(user? user.likedProducts: []);
            } catch (error) {
                console.error(error);
            }
        }
        fetchProduct(pagina);
        
    }, [user, pagina]);
    
    const loadMoreProducts = async () => {
        if(!loading){
            setPagina(prevPage => prevPage + 1);
        }
    }

    return(
        <View style={styles.content}>
            <ProdctList loadMoreProducts={loadMoreProducts}
                        loading={loading}
                        productos={productos}
                        productsLikeds={productsLikeds}
                        setProductsLikeds={setProductsLikeds}
                        user={user}/>
        </View>
    );
};

const styles = StyleSheet.create({

    content: {  
        justifyContent: 'center',
        alignItems: 'center',
    },
})
    
export default AllProduct;