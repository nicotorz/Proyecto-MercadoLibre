import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import Api from "../../../services/api";
import Producto from "../../../components/producto/Producto";
import ProductList from "../../../components/producto/ProductList";
import { useContext } from "react";
import { AuthContext } from "../../../hooks/authContext";

const Category = () => {
    const [loading, setLoading] = useState(true);
    const { id, name } = useLocalSearchParams();
    const [products, setProducts] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [productsLikeds, setProductsLikeds] = useState(user? user.likedProducts: []);
    const [amountPage, setAmountPage] = useState(0);

    const navigation = useNavigation();
    const {user} = useContext(AuthContext);
    useEffect(()  => {
        navigation.setOptions({ title: name});
    }, [name, navigation]);

    useEffect(() => {
        setLoading(true); 
        Api.getProductsByCategory(id, pagina)
            .then(response => {
                setProducts([...products, ...response.products]);
                setAmountPage(response.amountOfPage);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            })
            .finally(() => {
                setLoading(false); 
            });
    }, [id, pagina]);

    const loadMoreProducts = async () => {
        if ( pagina + 1 <= amountPage) {
            setPagina(prevPage => prevPage + 1);
        }else{
            setLoading(true);
        }
    };

    return (
        <View style={styles.content}>
            <ProductList
                loadMoreProducts={loadMoreProducts}
                loading={loading}
                productos={products}
                productsLikeds={productsLikeds}
                setProductsLikeds={setProductsLikeds}
                user={user}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 10,
        backgroundColor: '#E7E7E7',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productItem: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        marginBottom: 10,
        borderRadius: 8,
    },
});

export default Category;
