$(document).ready(function() {
    function createLoginForm() 
    {
        const loginForm = $('<form id="login-form"></form>');
        loginForm.append('<h2>Restaurant Login</h2>');
        loginForm.append('<select id="user-type"><option value="visitor">Visitor</option><option value="manager">Manager</option></select><br><br>');
        loginForm.append('<input type="text" id="username" placeholder="Username"><br><br>');
        loginForm.append('<input type="password" id="password" placeholder="Password"><br><br>');
        loginForm.append('<button type="submit">Login</button>');
        loginForm.append('<p>Not registered? <a href="#" id="show-signup">Sign Up</a></p>');
        return loginForm;
    }

    function createSignUpForm() 
    {
        const signUpForm = $('<form id="signup-form"></form>');
        signUpForm.append('<h2>Sign Up</h2>');
        signUpForm.append('<select id="new-user-type"><option value="visitor">Visitor</option><option value="manager">Manager</option></select><br><br>');
        signUpForm.append('<input type="text" id="new-username" placeholder="Choose Username"><br><br>');
        signUpForm.append('<input type="password" id="new-password" placeholder="Choose Password"><br><br>');
        signUpForm.append('<input type="email" id="email" placeholder="Email"><br><br>');
        signUpForm.append('<button type="submit">Sign Up</button>');
        signUpForm.append('<p>Already have an account? <a href="#" id="show-login">Login</a></p>');
        return signUpForm;
    }

    function showLoginForm() 
    {
        $('#form-container').empty().append(createLoginForm());
    }

    function showSignUpForm() 
    {
        $('#form-container').empty().append(createSignUpForm());
    }

    showLoginForm();


    $('#form-container').on('click', '#show-signup', function(e) 
    {
        showSignUpForm();
    });

    $('#form-container').on('click', '#show-login', function(e) 
    {
        showLoginForm();
    });

    $('#form-container').on('submit', '#login-form', function(e) 
    {
        e.preventDefault();
        const userType = $('#user-type').val();
        const username = $('#username').val();
        const password = $('#password').val();

        if (username && password) 
        {
            alert(`${userType.charAt(0).toUpperCase() + userType.slice(1)} login successful!`);
            if (username && password) 
            {
                alert(`${userType.charAt(0).toUpperCase() + userType.slice(1)} login successful!`);
                if (userType === 'visitor') 
                {
                    window.location.href = 'visitor_dashboard.html'; 
                } 
                else if (userType === 'manager') 
                {
                    window.location.href = 'manager_dashboard.html'; 
                }
            }
        } 
        else 
        {
            alert('Please enter both username and password.');
        }
    });

    $('#form-container').on('submit', '#signup-form', function(e) 
    {
        e.preventDefault();
        const userType = $('#new-user-type').val();
        const username = $('#new-username').val();
        const password = $('#new-password').val();
        const email = $('#email').val();

        if (username && password && email) 
        {
            alert(`${userType.charAt(0).toUpperCase() + userType.slice(1)} account created successfully!`);
            showLoginForm(); 
        } 
        else 
        {
            alert('Please fill in all fields.');
        }
    });
});