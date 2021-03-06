import React, { useState, useEffect } from "react";
    
const CartContext = React.createContext([]);
    
function CartProvider ({children}) {

    const [cart, setCart] = useState([]);
    const [cartLength,setTotalItems] = useState();
    const [cartPrice,setTotalPrecio] = useState(0)
    
    useEffect(()=>{

        let totItems = 0;
        let precio = 0;

        for(let cartItem of cart) {
            totItems += cartItem.quantity;
            precio += cartItem.quantity * cartItem.item.price;
        }

        setTotalItems(totItems);
        setTotalPrecio(precio)

    },[cart])
    
    const addItem = (newItem, newQuantity)=>{

        const prevCartItem = cart.find(e=> e.item.id === newItem.id)

        let newCart;
        let qty;
        if (prevCartItem){
            newCart = cart.filter(e => e.item.id !== newItem.id)
            qty = prevCartItem.quantity + newQuantity;
        }else{
            newCart = [...cart]
            qty =  newQuantity;
        }

        setCart([...newCart, 
            { item: newItem , quantity: qty  }])
        
    } // agregar cierta cantidad de un ítem al carrito

    const removeItem = (itemId) =>{
        const newCart = cart.filter(e => e.item.id !== itemId)
        setCart(newCart)
    }// Remover un item del cart por usando su id

    const clear = ()=>{
        setCart([])
    } // Remover todos los items

    const isInCart = (id) =>{
        const currentItem = cart.find(e=> e.item.id === id)

        return currentItem ? true : false
    } 

    return (
        <CartContext.Provider value={{cart, addItem, clear, isInCart, removeItem, cartPrice, cartLength}} >
            {children}
        </CartContext.Provider>
     )

}

export {CartProvider, CartContext};