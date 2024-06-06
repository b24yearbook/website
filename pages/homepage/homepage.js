const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting){
            entry.target.classList.add('comeBack');
        } else {
            entry.target.classList.remove('comeBack');
        }
    });
});
const hiddenElements = document.querySelectorAll('.goAwayLeft, .goAwayRight');
hiddenElements.forEach((el) => observer.observe(el));