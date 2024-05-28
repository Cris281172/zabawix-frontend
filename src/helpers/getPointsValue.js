const getPointsValue = (price, promotionPrice) => {
    const pointsConverterValue = 10
    if(promotionPrice){
        return promotionPrice * pointsConverterValue
    }
    return price * pointsConverterValue
}

export default getPointsValue