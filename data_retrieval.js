/* This is the file for anything related to converting external data (text, sets of images, etc.) into 
something to be inputted into a webpage. Returns text, image, or whatever. 

This file deals with all of that messy conversion, like 
"remove the new lines in the text" 
"split each paragraph into its own line in a list" 
or whatever random logic we need just to get a piece of text or image.

*/

/* Local Storage Functions, unnecessary but just so it's cleaner */
function getUsers(key) {
    return localStorage.get(key);
}
function setUsers(key, val) {
    return localStorage.set(key, val);
}


/* Messy Stuff idk how to categorize yet */
function getImage() { /* Returns the src path to replace whatever */

}

function getWriteup() {
    ;
}