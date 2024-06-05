
function login() {
            
    let password = document.getElementById("password").value;

    if (password == "password") {
        window.open("pages/homepage/homepage.html", "_self");
    } else if (password == ""){
        alert("Please enter a password.");
    } else {
        alert("Incorrect password. Please recheck what you typed and try again.");
    }
    
}