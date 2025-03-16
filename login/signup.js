document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    
    alert("Sign up successful! You can now log in.");
    window.location.href = "login.html";
});

function signUpWithGoogle() {
    alert("Google Sign-Up feature coming soon!");
}

function signUpWithInstagram() {
    alert("Instagram Sign-Up feature coming soon!");
}