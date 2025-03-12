import { StyleSheet } from "react-native";

const SearchStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 16,
        backgroundColor: '#ffff',
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 50,
        color: 'black',
    },
    searchButton: {
        padding: 10,
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noResultsImage: {
        width: 250,
        height: 250,
        marginTop: 100,
        marginBottom: 20,
    },
    noResultsText: {
        color: '#666666',
        fontSize: 32,
    },
    grid: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    product: {
        flex: 1,
        maxWidth: '50%',
    },
});

export default SearchStyles;
