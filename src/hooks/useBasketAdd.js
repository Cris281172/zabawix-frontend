import {useEffect, useState} from "react";

const useBasketAdd = () => {
    const [basketData, setBasketData] = useState(() => {
        console.log('test');
        if(localStorage.getItem('basket')){
            return JSON.parse(localStorage.getItem('basket'))
        }
        else{
            return(
                {
                    data: [],
                    price: 0
                }
            )
        }
    })
    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(basketData));
    }, [basketData]);

    const addItemToBasket = (productID, quantity, productPrice, productTitle) => {
        console.log(basketData)
        setBasketData(prevState => {
            console.log(prevState);
            return ({price: 0, data: [...prevState.data, {productID: productID, quantity: quantity, productPrice: productPrice, productTitle: productTitle}]})
        })
    }

    const createNewBasket = (data, price) => setBasketData({data, price});

    return{
        addItemToBasket
    }
}

export default useBasketAdd