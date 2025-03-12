export function getPurchaseHistoryProducts(purchaseHistory) {
    return purchaseHistory.flatMap(history => history.items.map(item => item.product));
}

export function getSalesHistoryProducts(salesHistory) {
    return salesHistory.map(sale => sale.product);
}

export function handleKeyDown(e, {handleAction}) {
    if (e.key === 'Enter') {
      handleAction;
    }
}

export function fieldsValidate (inputDescription, images, characteristics) {
    return !inputDescription.stock       || 
           !inputDescription.description ||
           !inputDescription.title       || 
           !inputDescription.price       || 
           !images                        || 
           !characteristics
}

const onlyNumberRedex = /^[0-9]+(\.[0-9]+)?$/;
export function priceValidate(price){
    return price <= 0 || !onlyNumberRedex.test(price);
}

export function validatePriceProduct(price){
    return price <= 1 || !onlyNumberRedex.test(price);
}