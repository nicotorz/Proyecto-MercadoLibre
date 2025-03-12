import { StyleSheet } from 'react-native';

const categoryItemStyle = StyleSheet.create({
    category: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        width: 185,
        height: 106,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginTop: 10
    },
    categoryIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconImage: {
        tintColor: '#3483FA',
    },
    categoryName: {
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 16,
        color: '#333',
    },
});

export default categoryItemStyle;