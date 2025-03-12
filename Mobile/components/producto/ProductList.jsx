import React from "react";
import Producto from './Producto';
import { FlatList, ActivityIndicator , StyleSheet, View } from 'react-native';

const ProductList = ({productos, productsLikeds, setProductsLikeds, loadMoreProducts, loading, user}) => {
    
   
    return (
       <View style={styles.content}>
            <FlatList
            data={productos}
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
                keyExtractor={(item, index) => `${item.id}-${index}`}
                numColumns={2}
                onEndReached = {loadMoreProducts}
                onEndReachedThreshold={0.5}
                ListFooterComponent={!loading && <ActivityIndicator size="large" color="#0000ff" />}
                initialNumToRender={20} 
                maxToRenderPerBatch={25}
                contentContainerStyle={styles.grid}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    grid: {
        justifyContent: 'space-between', 
      },
    content:{
        width: '100%',
    },
    product:{
        flex:1,
        maxWidth: '50%',
   
    }
})

export default ProductList;