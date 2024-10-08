var inputName = document.querySelector("#inputName");
var inputEmail = document.querySelector("#inputEmail");
var inputPassword = document.querySelector("#inputPassword");
var message = document.querySelector("#message");
var buttonLogin = document.querySelector("#buttonLogin");
var welcome = document.querySelector("#welcome");
var backSignUp = document.querySelector("#backSignUp");
var user = [];

if (localStorage.getItem("users") !== null) {
    user = JSON.parse(localStorage.getItem("users"));
}

function addUsers() {
    if (
        inputName.value == "" ||
        inputEmail.value == "" ||
        inputPassword.value == ""
    ) {
        message.innerHTML = `<p class="text-danger">All inputs are required</p>`;
    } else if (
        !validation(inputEmail, "email") ||
        !validation(inputPassword, "password")
    ) {
        message.innerHTML = `<p class="text-danger">Invalid email or password</p>`;
    } else if (isExist()) {
        message.innerHTML = `<p class="text-danger">User already exists</p>`;
        inputEmail.classList.add("is-invalid");
    } else {
        var newUser = {
            name: inputName.value,
            email: inputEmail.value,
            password: inputPassword.value,
        };
        user.push(newUser);
        localStorage.setItem("users", JSON.stringify(user));
        message.innerHTML = `<p class="text-success">Successfully registered</p>`;
        setTimeout(() => {
            location.href = "signin.html";
        }, 2000);
    }
}

function login() {
    if (inputEmail.value == "" || inputPassword.value == "") {
        message.innerHTML = `<p class="text-danger">All inputs is required</p>`;
    } else if (
        !validation(inputEmail, "email") ||
        !validation(inputPassword, "password")
    ) {
        message.innerHTML = `<p class="text-danger">Invalid email or password</p>`;
    } else {
        var user = getUser(inputEmail.value, inputPassword.value);
        if (user) {
            localStorage.setItem("loggedInUser", user.name);
            message.innerHTML = `<p class="text-success">Successfully</p>`;
            setTimeout(() => {
                location.href = "home.html";
            }, 2000);
        } else {
            message.innerHTML = `<p class="text-danger">Email or Password Incorrect </p>`;
            inputEmail.classList.add("is-invalid");
            inputPassword.classList.add("is-invalid");
        }
    }
}

function getUser(email, password) {
    var users = JSON.parse(localStorage.getItem("users")) || [];
    for (var i = 0; i < users.length; i++) {
        if (
            users[i].email.toLowerCase() === email.toLowerCase() &&
            users[i].password === password
        ) {
            return users[i];
        }
    }

    return null;
}

function getUserName(email) {
    var users = JSON.parse(localStorage.getItem("users"));
    var name;
    for (var i = 0; i < users.length; i++) {
        if (user[i].email == email) {
            name = user[i].name;
        }
    }
    return name;
}

function validation(input, type) {
    var regex = {
        name: /^([a-zA-Z\s\-]+)$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        password: /^[a-zA-Z]\w{3,14}$/,
    };

    if (regex[type]) {
        if (regex[type].test(input.value)) {
            input.classList.add("is-valid");
            input.classList.remove("is-invalid");
            return true;
        } else {
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");
            return false;
        }
    }
    return false;
}

function isExist() {
    for (var i = 0; i < user.length; i++) {
        if (user[i].email.toLowerCase() === inputEmail.value.toLowerCase()) {
            return true;
        }
    }
    return false;
}

if (buttonLogin) {
    buttonLogin.addEventListener("click", function () {
        if (window.location.pathname.includes("index.html")) {
            addUsers();
        } else {
            login();
        }
    });
}

if (welcome) {
    welcome.innerHTML = "Welcome " + localStorage.getItem("loggedInUser");
}

if (backSignUp) {
    backSignUp.addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
    });
}
