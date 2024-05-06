function checkvalid() {
    let found = false
    // Get the valid encrypted passwords
    //// placeholder code (PC)
    let vPassws; fetch("passwords.txt").then(f => vPassws = f);
    // Decrypt / encrypt upass and compare 
    let uPass = localStorage.getItem("password");
    /// check if upass is valid 
    let vPass = vPassws;/* PC - for each pass in vPassws */
    if (uPass == vPass) {
        found = true;
        /*break*/
    }
        //loop ends here
    if (found == false) {
        window.location.replace("index.html")
    }
}