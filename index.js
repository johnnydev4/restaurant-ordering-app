import menuArray from './data.js'


const cartArray = []

// rem dom
function render(){
    const html = menuArray.map(function(item){
        return `
            <div class="menu-item">
                <img src="./images/${item.image}" class="menu-image">
                <ul class="item-details">
                    <li class="foodName">${item.name}</li>
                    <li class="ingredients">${item.ingredients}</li>
                    <li class="priceEl">$${item.price}</li>
                </ul>
                <p class="add-btn" data-id="${item.id}" role="button">+</p>
            </div>
        `
    }).join("")
    
    document.getElementById('menuEl').innerHTML = html
}

render()

// adding to cart
addEventListener("click", function(event){
    if (event.target.dataset.id){
        const clickId = event.target.dataset.id
        
        cartArray.push(menuArray.find(function(item){
            return item.id === Number(clickId)
        }))
        
        cartRen()

    }
})



// total cart price function

function getTotalPrice(data){
const sum = data.reduce(function (total, current){
return total + current.price
},0)
return sum
}


// rem cart function

function cartRen(){
    const ItemsHtml = cartArray.map(function(cartItem){
return `  
            
                <div class="cart-items">
                    <p class="cart-item-name">${cartItem.name}</p>
                    <p class="remove-btn" role="button">remove</p> 
                     <p class="cart-item-price">$${cartItem.price}</p> 
                </div>
               
       
        `

    }).join("")
 const totalPrice = getTotalPrice(cartArray)
    const html = `      <h3>Your Order</h3>
                    <div class="cartOverflow">
                            ${ItemsHtml}
                    </div>
                    <div class="price-total"> 
                            <p>Total price:</p> 
                            <p class="totalNumber">$${totalPrice}</p> 
                         </div> 
                            <p class="purchaseBtn" role="button">Complete Order</p> 
                 `

    document.getElementsByClassName('cart')[0].innerHTML = html
}

