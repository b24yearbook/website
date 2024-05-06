
window.addEventListener('scroll', reveal);


// What does this do. Please add a comment explaining this function here.
function reveal() {

  var reveals = document.querySelectorAll('.hidden-content');
  
  for (var i = 0; i < reveals.length; i++) {
    var windowheight = window.innerHeight;
    var revealtop = reveals[i].getBoundingClientRect().top;
    var revealpoint = 150;
    
    if (revealtop < windowheight - revealpoint) {
      reveals[i].classList.add('active');
    } else {
      reveals[i].classList.remove('active');
    }
  }
}