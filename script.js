document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu');
    const cartList = document.getElementById('cart');
    const totalDisplay = document.getElementById('total');
    let cart = [];

    function loadMenuItems() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'menu.json', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                const items = JSON.parse(xhr.responseText);
                renderMenu(items);
            }
        };
        xhr.send();
    }

    function renderMenu(items) {
        items.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col-md-6';
            col.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.description}</p>
            <p><strong>$${item.price.toFixed(2)}</strong></p>
            <button class="btn btn-primary" onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
          </div>
        </div>
      `;
            menuContainer.appendChild(col);
        });
    }

    window.addToCart = function(item) {
        cart.push(item);
        updateCartDisplay();
    };

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartDisplay();
    }

    function updateCartDisplay() {
        cartList.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)}
        <button class="remove" onclick="removeFromCart(${index})">&times;</button>
      `;
            cartList.appendChild(li);
            total += item.price;
        });
        totalDisplay.textContent = total.toFixed(2);
    }

    window.removeFromCart = removeFromCart;

    document.getElementById('checkoutBtn').addEventListener('click', () => {
        alert('Checkout not implemented. This is a demo.');
    });

    loadMenuItems();
});
