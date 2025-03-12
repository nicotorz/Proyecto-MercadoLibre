import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import categoryIcons from './CategoriesIcons';
import categoryItemStyle from './CategoryItemStyle'; 
import { useRouter } from 'expo-router';

const CategoryItem = ({categoryName, categoryId}) => {

    const capitalizedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1); 
    const categoryIcon = categoryIcons[categoryId];

    const router = useRouter();

    const handleCategoryClick = () => {
        router.push(`/(tabs)/categories/${categoryId}`);
        router.setParams({name: capitalizedCategoryName})
    };
    
    return (
        <TouchableOpacity style={categoryItemStyle.category} onPress={handleCategoryClick}>
            <View style={categoryItemStyle.categoryIcon}>
                <Image source={categoryIcon} style={categoryItemStyle.iconImage} />
            </View>
            <View style={categoryItemStyle.categoryName}>
                <Text style={categoryItemStyle.categoryText}>{capitalizedCategoryName}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default CategoryItem;
