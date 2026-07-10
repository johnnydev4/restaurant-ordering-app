import menuArray from './data.js'

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
                <p class="add-btn" role="button">+</p>
            </div>
        `
    }).join("")
    
    document.getElementById('menuEl').innerHTML = html
}

render()