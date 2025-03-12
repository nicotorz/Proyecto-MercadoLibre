import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, Text, StyleSheet } from "react-native";
import CategoryItem from "../../../components/categories/CategoryItem";
import Api from "../../../services/api";

export default function CategoriesScreen() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        Api.getCategories()
            .then(response => {
                setCategories(response);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const renderCategoryItem = ({ item }) => (
        <CategoryItem 
            categoryName={item.name}
            categoryId={item.id}
        />
    );

    return (
            <SafeAreaView style={categoriesStyle.container}>
                <FlatList
                    data={categories}
                    renderItem={renderCategoryItem}
                    keyExtractor={(item) => item.id.toString()} 
                    numColumns={2}
                    columnWrapperStyle={categoriesStyle.row}
                />
            </SafeAreaView>
    );
}

const categoriesStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E7E7E7",
        paddingHorizontal: 15,
    },
    row: {
        flex: 1,
        justifyContent: 'space-between',
        marginVertical: 2,
    },
});
