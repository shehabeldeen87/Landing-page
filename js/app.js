/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const sections = document.getElementsByTagName('section');
const ul = document.getElementById('navbar__list');
const ul_array = document.getElementById('navbar__list').childNodes;
const burgerMenu = document.querySelector('.hamburger-menu');
const header = document.querySelector('.page__header');

// console.log(sections);
// console.dir(ul);
// get our sections pageYOffset values here
const sectionsOffsetTopVAL = [];
let activeSection;
let activeSection_idx;
/**
 * End Global Variables
 * Start Helper Functions
 *
 */



/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const buildNav = () => {
    for (let section of sections) {

        let li = section.attributes['data-nav'].nodeValue;
        // console.log(li);
        ul.innerHTML += `<li><a href="" class="menu__link">${li}</a></li>`;
        // get our sections pageYOffset values
        sectionsOffsetTopVAL.push(section.offsetTop);
    }
    // set our first li item active
    ul.childNodes[0].classList.add('active-nav');
}

buildNav();

/**
 * End Main Functions
 * Begin Events
 *
 */

// track the window YOffset to detect the active section

window.addEventListener('scroll', (e) => {

    // check if we reached the first section
    if (sectionsOffsetTopVAL && window.pageYOffset >= sectionsOffsetTopVAL[0]) {

        //console.dir(window.pageYOffset);
        // loop through just our sections pageYOffset values to detect the active section
        sectionsOffsetTopVAL.map((value, index) => {
            // 150 to avoid changing active class when we just hit the last few px of the section
            if (value <= window.pageYOffset + 150) {
                //console.dir(e.target);
                //console.dir(sections[index]);
                // define our active section to add our active class to it
                activeSection = sections[index];
                // define
                activeSection_idx = index;
            }
        })

        // check if our active class is already in our active ssection classList
        if (activeSection.classList.contains("your-active-class")) {
            return
        } else {
            // remove our active class from all sections
            for (let section of sections) {
                section.classList.remove("your-active-class")
            }
            // remove our active class from all nav li
            for (let li of ul_array) {
                li.classList.remove("active-nav")
            }
            // add our active class to only our active section
            activeSection.classList.add("your-active-class")
            // add our active class to only our active nav li
            ul_array[activeSection_idx].classList.add("active-nav")
        }
            // console.dir(activeSection);
    }
})

// show side menu
burgerMenu.addEventListener('click', (e) => {
    header.classList.toggle("slide-out");
})

// Scroll to section on link click
ul.addEventListener('click', (e) => {
    // prevent a(href) default behaviour
    e.preventDefault();
    console.dir(e.target.nodeName)
    if (e.target.nodeName == 'A') {
        for (let section of sections) {
            if (e.target.outerText == section.attributes['data-nav'].nodeValue) {
                window.scrollTo({
                    top: section.offsetTop,
                    left: section.offsetLeft,
                    behavior: 'smooth'
                })
            }
        }
    }
})
