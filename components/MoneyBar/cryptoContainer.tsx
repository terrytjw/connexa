import { useState, useEffect, useCallback } from 'react'
import Crypto from "./cryptoPrice/crypto"
import getPrice from './cryptoPrice/price'
// crypto = ['bitcoin', 'ethereum', 'solana', 'cardano]
//map each s
const cryptoContainer = ({ crypto }) => {
    const [price, setPrice] = useState(0)
    const updatePrice = useCallback(async () => {
        const newPrice = await getPrice(crypto)
        if (price !== newPrice) {
            return setPrice(newPrice)
        }
    }, [crypto, price])
    useEffect(() => {
        const interval = setInterval(updatePrice, 1000)
        /* The return value of the Effect Hook is a cleanup function */
        return () => clearInterval(interval) 
    }, [updatePrice])
    return (
        <Crypto crypto={crypto} price={price}/>
    )
}

export default cryptoContainer