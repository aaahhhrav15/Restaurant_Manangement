$(document).ready(function() 
{
    function createDishList() 
    {
        const dishList = $('<div id="dish-list"></div>');
        dishList.append('<h2>Available Dishes</h2>');
        
        const dishes = [
            { id: 1, name: 'Pasta Carbonara', price: 12.99, description: 'Creamy pasta with bacon and parmesan' },
            { id: 2, name: 'Margherita Pizza', price: 14.99, description: 'Classic pizza with tomato, mozzarella, and basil' },
            { id: 3, name: 'Caesar Salad', price: 8.99, description: 'Crisp romaine lettuce with Caesar dressing and croutons' },
            { id: 4, name: 'Grilled Salmon', price: 17.99, description: 'Fresh salmon fillet with lemon butter sauce' }
        ];

        dishes.forEach(dish => {
            const dishItem = $(`
                <div class="dish-item">
                    <h3>${dish.name}</h3>
                    <p>${dish.description}</p>
                    <p>Price: $${dish.price.toFixed(2)}</p>
                    <button class="buy-btn" data-id="${dish.id}">Add to Cart</button>
                </div>
            `);
            dishList.append(dishItem);
        });

        return dishList;
    }

    function showVisitorDashboard() 
    {
        const dashboard = $('<div id="dashboard"></div>');
        dashboard.append('<h1>Welcome to Our Restaurant!</h1>');
        dashboard.append('<p>Browse our delicious dishes and add them to your cart.</p>');
        dashboard.append(createDishList());
        dashboard.append('<div id="cart"><h3>Your Cart</h3><ul id="cart-items"></ul><p id="cart-total">Total: $0.00</p></div>');
        $('#visitor-dashboard').empty().append(dashboard);
    }

    showVisitorDashboard();

    let cart = [];

    function updateCart() 
    {
        const cartList = $('#cart-items');
        cartList.empty();
        let total = 0;

        cart.forEach((item, index) => {
            cartList.append(`
                <li>
                    ${item.name} - $${item.price.toFixed(2)}
                    <button class="delete-item" data-index="${index}">Remove</button>
                </li>
            `);
            total += item.price;
        });

        $('#cart-total').text(`Total: $${total.toFixed(2)}`);
    }

    $('#visitor-dashboard').on('click', '.buy-btn', function(e) {
        const dishId = $(this).data('id');
        const dishItem = $(this).closest('.dish-item');
        const dish = {
            id: dishId,
            name: dishItem.find('h3').text(),
            price: parseFloat(dishItem.find('p:contains("Price")').text().replace('Price: $', ''))
        };

        cart.push(dish);
        updateCart();
        alert(`${dish.name} added to your cart!`);
    });

    $('#visitor-dashboard').on('click', '.delete-item', function(e) {
        const index = $(this).data('index');
        const removedItem = cart.splice(index, 1)[0];
        updateCart();
        alert(`${removedItem.name} removed from your cart!`);
    });
});