// -------------------- LOGIN / SIGNUP --------------------
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let storedUser = localStorage.getItem("user");

    if (!storedUser) {
        alert("No account found! Please sign up first.");
        return;
    }

    let user = JSON.parse(storedUser);

    if (username === user.username && password === user.password) {
        alert("Login successful!");
        window.location.href = "menu.html";
    } else {
        alert("Invalid username or password!");
    }
}

function signup() {
    let newUsername = document.getElementById("new-username").value;
    let newPassword = document.getElementById("new-password").value;

    if (newUsername === "" || newPassword === "") {
        alert("Please fill all fields!");
        return;
    }

    let user = {
        username: newUsername,
        password: newPassword
    };

    localStorage.setItem("user", JSON.stringify(user));
    alert("Account created successfully! Now you can login.");
    showLogin();
}

function showSignup() {
    document.querySelector(".login-form").style.display = "none";
    document.getElementById("signup").style.display = "block";
}

function showLogin() {
    document.querySelector(".login-form").style.display = "block";
    document.getElementById("signup").style.display = "none";
}


// -------------------- CART & MENU --------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
}

function goToCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "cart.html";
}


// -------------------- CART PAGE --------------------
if (window.location.pathname.includes("cart.html")) {
    displayCart();
}

function displayCart() {
    const cartItemsDiv = document.getElementById("cart-items");
    const totalSpan = document.getElementById("total");

    cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsDiv.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    }

    cart.forEach((item, index) => {
        let itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.style.margin = "10px 0";
        itemDiv.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>₹${item.price} x 
                <button onclick="decreaseQuantity(${index})">–</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>
                = ₹${item.price * item.quantity}
            </p>
            <hr>
        `;
        cartItemsDiv.appendChild(itemDiv);
        total += item.price * item.quantity;
    });

    totalSpan.textContent = total;
}

function increaseQuantity(index) {
    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function decreaseQuantity(index) {
    cart[index].quantity -= 1;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function goToPayment() {
    let total = document.getElementById("total").textContent;
    localStorage.setItem("total", total);
    window.location.href = "payment.html";
}

function goToMenu() {
    window.location.href = "menu.html";
}


// -------------------- PAYMENT PAGE --------------------
if (window.location.pathname.includes("payment.html")) {
    const total = localStorage.getItem("total") || 0;
    document.getElementById("payment-total").textContent = total;
}

function payOnline() {
    alert("Payment successful! Thank you for your order.");
    localStorage.removeItem("cart");
    window.location.href = "thankyou.html";
}

function payCash() {
    alert("Please pay cash on delivery. Thank you!");
    localStorage.removeItem("cart");
    window.location.href = "thankyou.html";
}
// ============ PAYMENT LOGIC ============

// Show online payment options
function showPaymentOptions() {
    document.getElementById("online-options").style.display = "block";
}

// Process selected payment type
function processPayment(method) {
    alert(`Your ${method} payment has been done successfull.`);
    // Optional: You can add form or animation here later
    window.location.href = "thankyou.html";
}

// Cash payment
function payCash() {
    alert("Please pay with cash at the counter.");
    window.location.href = "thankyou.html";
}

// Go back to cart
function goToCart() {
    window.location.href = "cart.html";
}

// Set total in payment page
document.addEventListener("DOMContentLoaded", function() {
    let total = localStorage.getItem("cartTotal") || 0;
    document.getElementById("payment-total").textContent = total;
});
localStorage.setItem("cart", JSON.stringify(cart));
updateCartTotal(); 
function updateCartTotal() {
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    localStorage.setItem("cartTotal", total);
}
function goToPayment() {
    updateCartTotal(); // ensure latest total is saved
    window.location.href = "payment.html";
}

