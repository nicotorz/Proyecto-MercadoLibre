import { FlatList, StyleSheet, View} from "react-native";
import { useLocalSearchParams,useNavigation } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../hooks/authContext";
import Producto from "../../../components/producto/Producto";   
const ProductProfileScreen = () => {
    
    const {user} = useContext(AuthContext);
    const { id } = useLocalSearchParams();
    const navigation = useNavigation();

    const getPurchaseHistoryProducts = (purchaseHistory)=>  {
        return purchaseHistory.flatMap(history => history.items.map(item => item.product));
    }
    
    const getSalesHistoryProducts =(salesHistory) => {
        return salesHistory.map(sale => sale.product);
    }
    
    const [products, setProducts] = useState([]);
    const [productsLikeds, setProductsLikeds] = useState(user? user.likedProducts: []);
    
    useEffect(() => { 
        navigation.setOptions({ title: `${id}` });
        const optionsMap = {
            "Liked": user.likedProducts || [],
            "Sales": getSalesHistoryProducts(user.salesHistory)  || [],
            "Purchases": getPurchaseHistoryProducts(user.purchaseHistory) || [],
            "My products": user.products || []
        };
        setProducts(optionsMap[id]);
    }, [id, productsLikeds, user])

        
    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <View style={styles.product}>
                        <Producto
                        id={item.id}
                        productLogo={item.images[0]}
                        descriptionProduct={item.tittle}
                        owner={item.owner}
                        precio={item.price}
                        productsLiked={productsLikeds}
                        setProductLiked={setProductsLikeds}
                        isLogged={user}
                        />
                    </View>
                )}
                    keyExtractor={item => `${item.id}-${id}`}
                    numColumns={2}
                    onEndReachedThreshold={0.5}
                    contentContainerStyle={styles.grid}
                    showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({ 
    container:{
        backgroundColor :"#E7E7E7",
        padding: 3,
        height: '100%',
    },
    product:{
        flex:1,
        maxWidth: '50%',
    }
})
export default ProductProfileScreen ;