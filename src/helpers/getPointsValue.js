const getPointsValue = (price, promotionPrice) => {
    const pointsConverterValue = 26.5
    if(promotionPrice){
        return promotionPrice * pointsConverterValue
    }
    return Math.floor(price * pointsConverterValue)
}

export default getPointsValue