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

    if (document.querySelector(".thanksMessage")){
        document.querySelector(".thanksMessage").remove()
    }

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
    const html = `      <div class="cart2">
                    <h3>Your Order</h3>
                    <div class="cartOverflow">
                            ${ItemsHtml}
                    </div>
                    <div class="price-total"> 
                            <p>Total price:</p> 
                            <p class="totalNumber">$<span id="totalPrice">${totalPrice}</span></p> 
                         </div> 
                            <p class="purchaseBtn" id="purchaseBtn" role="button">Complete Order</p> 
                            </div>
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
document.body.insertAdjacentHTML("beforeend", `
            <div class="overlay">
                <div class="payment-popup">
                    <h3>Enter card details</h3>
                    <form id="paymentForm">
                        <input type="text" id="name" data-name="name" pattern="[A-Za-z ]+" placeholder="Enter your name" maxlength="20" required>
                        <input type="text" id="cardNumber" inputmode="numeric" autocomplete="cc-number" pattern="[0-9]{16}" maxlength="16" placeholder="Enter card number" required>
                        <input type="password" id="cvv" placeholder="Enter CVV" maxlength="3" pattern="[0-9]{3}" 
                        inputmode="numeric"  required>
                    </form>
                    <button form="paymentForm" id="payBtn">Pay</button>
                </div>
            </div>
        `)
    }
})


// pressing the form's payment btn

document.addEventListener("click", function(event){
if (event.target.id === "payBtn"){ 
    cartArray.length = 0
const userName = document.getElementById("name").value
event.preventDefault();
document.querySelector(".overlay").remove();
document.querySelector(".cart2").remove();
document.getElementById("menuEl").insertAdjacentHTML("afterend", `
    <div class="thanksMessage">
        <p>Thanks, ${userName}! your order is on its way!</p>
    </div>
`)

}
})


