document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");
    const storedName = localStorage.getItem("userName");
    
    if (email === storedEmail && password === storedPassword) {
        alert("Login successful! Welcome, " + storedName);
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid email or password.");
    }
});

function signInWithGoogle() {
    alert("Google Sign-In feature coming soon!");
}

function signInWithInstagram() {
    alert("Instagram Sign-In feature coming soon!");
}