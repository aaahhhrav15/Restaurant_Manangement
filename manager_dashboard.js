$(document).ready(function() {
    let dishes = [
        { id: 1, name: 'Pasta Carbonara', price: 12.99, description: 'Creamy pasta with bacon and parmesan' },
        { id: 2, name: 'Margherita Pizza', price: 14.99, description: 'Classic pizza with tomato, mozzarella, and basil' },
        { id: 3, name: 'Caesar Salad', price: 8.99, description: 'Crisp romaine lettuce with Caesar dressing and croutons' }
    ];

    function createDishList() 
    {
        const dishList = $('<div id="dish-list"></div>');
        dishList.append('<h2>Current Dishes</h2>');
        
        dishes.forEach(dish => {
            const dishItem = $(`
                <div class="dish-item" data-id="${dish.id}">
                    <h3>${dish.name}</h3>
                    <p>${dish.description}</p>
                    <p>Price: $${dish.price.toFixed(2)}</p>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `);
            dishList.append(dishItem);
        });

        return dishList;
    }

    function createDishForm(dish = null) {
        const form = $('<form id="dish-form"></form>');
        form.append(`<h2>${dish ? 'Edit Dish' : 'Create New Dish'}</h2>`);
        form.append(`<input type="hidden" id="dish-id" value="${dish ? dish.id : ''}">`);
        form.append(`<input type="text" id="dish-name" placeholder="Dish Name" value="${dish ? dish.name : ''}" required><br>`);
        form.append(`<textarea id="dish-description" placeholder="Dish Description" required>${dish ? dish.description : ''}</textarea><br>`);
        form.append(`<input type="number" id="dish-price" placeholder="Price" step="0.01" min="0" value="${dish ? dish.price : ''}" required><br>`);
        form.append(`<button type="submit">${dish ? 'Update Dish' : 'Create Dish'}</button>`);
        if (dish) {
            form.append('<button type="button" id="cancel-edit">Cancel</button>');
        }
        return form;
    }

    function showManagerDashboard() 
    {
        const dashboard = $('<div id="dashboard"></div>');
        dashboard.append('<h1>Restaurant Manager Dashboard</h1>');
        dashboard.append('<button id="create-dish-btn">Create New Dish</button>');
        dashboard.append('<div id="form-container"></div>');
        dashboard.append(createDishList());
        $('#manager-dashboard').empty().append(dashboard);
    }

    showManagerDashboard();

    $('#manager-dashboard').on('click', '#create-dish-btn', function() {
        $('#form-container').empty().append(createDishForm());
    });

    $('#manager-dashboard').on('submit', '#dish-form', function(e) {
        e.preventDefault();
        const id = $('#dish-id').val();
        const newDish = {
            id: id ? parseInt(id) : Date.now(), 
            name: $('#dish-name').val(),
            description: $('#dish-description').val(),
            price: parseFloat($('#dish-price').val())
        };

        if (id) 
        {
            const index = dishes.findIndex(dish => dish.id === parseInt(id));
            if (index !== -1) 
            {
                dishes[index] = newDish;
            }
        } 
        else 
        {
            dishes.push(newDish);
        }

        showManagerDashboard();
        alert(`Dish ${id ? 'updated' : 'created'} successfully!`);
    });

    $('#manager-dashboard').on('click', '.edit-btn', function() {
        const dishId = $(this).closest('.dish-item').data('id');
        const dish = dishes.find(d => d.id === dishId);
        if (dish) 
        {
            $('#form-container').empty().append(createDishForm(dish));
        }
    });

    $('#manager-dashboard').on('click', '.delete-btn', function() {
        const dishId = $(this).closest('.dish-item').data('id');
        if (confirm('Are you sure you want to delete this dish?')) 
        {
            dishes = dishes.filter(d => d.id !== dishId);
            showManagerDashboard();
            alert('Dish deleted successfully!');
        }
    });
    
    $('#manager-dashboard').on('click', '#cancel-edit', function() {
        $('#form-container').empty();
    });
});