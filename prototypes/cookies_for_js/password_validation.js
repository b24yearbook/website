async function checkValid() {
    console.log("test");
    let found = false, vPassws;
    // Get the valid encrypted passwords
    //// placeholder code (PC)
    await fetch("passwords.txt").then(f=> i = f.text()).then(i => vPassws = i);
    // Decrypt / encrypt upass and compare 
    let uPass = localStorage.getItem("password");
    /// check if upass is valid 
    let vPass = vPassws;/* PC - for each pass in vPassws */
    console.log(uPass, vPassws)
    if (uPass == vPass) {
        found = true;
        /*break*/
    }
        //loop ends here
    console.log(found)
    if (found == false) {
        window.location.replace("index.html")
    }
}
checkValid()