import { useEffect, useState } from "react";
import "./styles/index.css";
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'



function App() {

    useEffect(() => {
      fetch('http://localhost:4000/items').then(resp => resp.json()).then(setShopItems)
    }, [])
    useEffect(() => {
      fetch('http://localhost:4000/cart').then(resp => resp.json()).then(setCartItems)
    }, [])


  const [shopItems, setShopItems] = useState([])
  const [cartItems, setCartItems] = useState([])



  const addToCart = (itemToAddToCart) => {
    let updateCart = [...cartItems];

    let doesItemAlreadyExist = updateCart.find(item => item.id === itemToAddToCart.id);

    
    if(doesItemAlreadyExist){
      updateCart = updateCart.map(item => itemToAddToCart.id === item.id ? {...item, quantity: item.quantity + 1 }   : item )
      fetch(`http://localhost:4000/cart/${doesItemAlreadyExist.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({...itemToAddToCart, quantity: itemToAddToCart.quantity + 1 })
      }).then((resp)=> {
        if(resp.ok){
          setCartItems(updateCart);
        }
      })
  
    
  
    }
    else{
     
     fetch('http://localhost:4000/cart',{
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({
        id: itemToAddToCart.id,
        quantity: 1
      })
    }).then(resp => resp.json()).then(itemFromServer => setCartItems([...cartItems, itemFromServer
     ])) 
      ;
    }
    
  }


  const removeCart = (itemToRemove) => {

    let updateCart = [...cartItems] 

    const findItemToRemove = updateCart.find(item => item.id === itemToRemove.id)

    if(findItemToRemove.quantity === 1){
      fetch(`http://localhost:4000/cart/${findItemToRemove.id}`, {
        method: 'DELETE'
      }) .then(resp => {
        if(resp.ok){
          updateCart = updateCart.filter(item => item.id !== findItemToRemove.id)
          setCartItems(updateCart);
        }
      })
    }
    else{
      updateCart = updateCart.map(item => itemToRemove.id === item.id ? {...item, quantity: item.quantity - 1 } : item )
      fetch(`http://localhost:4000/cart/${findItemToRemove.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({...itemToRemove , quantity: itemToRemove.quantity - 1 })
      }).then((resp)=> {
        if(resp.ok){
          setCartItems(updateCart);
        }
      })
    }

  }



  return( <body>
 <Header shopItems={shopItems} addToCart={addToCart} />
 <Main  shopItems={shopItems} cartItems={cartItems} addToCart={addToCart} removeCart={removeCart} />
 <Footer />

</body>)

}

export default App;