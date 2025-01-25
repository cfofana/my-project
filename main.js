const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');


navToggle.addEventListener('click', () => {
    nav.classList.toggle('nav--visible');
})

// Get date and display it in copyright section
const dateObject = new Date();
const dateYear = dateObject.getFullYear();
document.querySelector(".copyright").innerHTML = "Copyright " + dateYear;