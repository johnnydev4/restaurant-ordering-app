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
        console.log(cartArray)

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
    const ItemsHtml = cartArray.map(function(cartItem, index){
return `  
            
                <div class="cart-items">
                    <p class="cart-item-name">${cartItem.name}</p>
                    <p class="remove-btn" role="button" data-index="${index}">remove</p> 
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
                            <p class="totalNumber">$<span id="totalPrice">${totalPrice}</span></p> 
                         </div> 
                            <p class="purchaseBtn" id="purchaseBtn" role="button">Complete Order</p> 
                 `

    document.getElementsByClassName('cart')[0].innerHTML = html
}

// remove function

addEventListener("click", function(event){
    if (event.target.dataset.index){ 
    const index = event.target.dataset.index
cartArray.splice(index,1)
cartRen(cartArray)
    
}

})

// payment wall popup

document.addEventListener("click", function(event){
if(event.target.id === "purchaseBtn"){
const totalPrice = document.getElementById("totalPrice")
if(totalPrice.textContent){ 

const father = document.querySelector(".father");
father.innerHTML = `
   <div class="payment-popup">
                    <h3>Enter card details</h3>
                    <form>
                        <label for="name"></label>
                        <input type="text" id="name" name="name" placeholder="Enter your name">
                        <label for="cardNumber"></label><br>
                        <input type="text" id="cardNumber" name="card" placeholder="Enter card number"><br>
                        <label for="cvv"></label>
                        <input type="text" id="cvv" name="cvv" placeholder="Enter CVV"><br>
                    </form>
                    <p role="button" class="payBtn">Pay</p>
                </div>

`
}
}

})

// agregar codigo de popup al dom