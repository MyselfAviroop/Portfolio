// index.js

const port= "3000"
  function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.add('sidebar-hidden');  // Hide the sidebar
  }
  function showSidebar() { // Show the sidebar
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.remove('sidebar-hidden'); 
    
  } 
const body = document.body;
let xPercent = 0;
let yPercent = 0;
let incrementX = 0.2;  // Speed of horizontal movement
let incrementY = 0.2;  // Speed of vertical movement

function animateGradient() {
  // Increment the xPercent and yPercent to create the movement
  xPercent += incrementX;
  yPercent += incrementY;

  // Reverse direction when limits are reached
  if (xPercent > 100 || xPercent < 0) incrementX = -incrementX;
  if (yPercent > 100 || yPercent < 0) incrementY = -incrementY;

  // Update the background gradient dynamically
  body.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, violet, black, aqua)`;

  // Call the animation recursively
  requestAnimationFrame(animateGradient);
}

// Start the animation
requestAnimationFrame(animateGradient);
var words = document.getElementsByClassName('word');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}

function changeWord() {
  var cw = wordArray[currentWord];
  var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
  for (var i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }
  
  for (var i = 0; i < nw.length; i++) {
    nw[i].className = 'letter behind';
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }
  
  currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
}

function animateLetterOut(cw, i) {
  setTimeout(function() {
    cw[i].className = 'letter out';
  }, i*80);
}

function animateLetterIn(nw, i) {
  setTimeout(function() {
    nw[i].className = 'letter in';
  }, 340+(i*80));
}

function splitLetters(word) {
  var content = word.innerHTML;
  word.innerHTML = '';
  var letters = [];
  for (var i = 0; i < content.length; i++) {
    var letter = document.createElement('span');
    letter.className = 'letter';
    letter.innerHTML = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }
  
  wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 4000);
// script.js

function transitionPage(targetPage) {
  const mainPage = document.querySelector('.main');
  
  // Apply the transition effect
  mainPage.style.transition = 'transform 0.8s ease-in-out';
  mainPage.style.transform = 'translateY(-100%)'; // Move up

  // Wait for the transition to complete before redirecting
  setTimeout(() => {
    window.location.href = targetPage; // Redirect to the specified page
  }, 800); // Match this with the CSS transition duration
}
var $window = $(window);
var $document = $(document);
//Only links that starts with #
var $navButtons = $("nav a").filter("[href^=#]");
var $navGoPrev = $(".go-prev");
var $navGoNext = $(".go-next");
var $slidesContainer = $(".slides-container");
var $slides = $(".slide");
var $currentSlide = $slides.first();

//Animating flag - is our app animating
var isAnimating = false;

//The height of the window
var pageHeight = $window.innerHeight();

//Key codes for up and down arrows on keyboard. We'll be using this to navigate change slides using the keyboard
var keyCodes = {
  UP  : 38,
  DOWN: 40
}

//Going to the first slide
goToSlide($currentSlide);


/*
*   Adding event listeners
* */

$window.on("resize", onResize).resize();
$window.on("mousewheel DOMMouseScroll", onMouseWheel);
$document.on("keydown", onKeyDown);
$navButtons.on("click", onNavButtonClick);
$navGoPrev.on("click", goToPrevSlide);
$navGoNext.on("click", goToNextSlide);

/*
*   Internal functions
* */


/*
*   When a button is clicked - first get the button href, and then slide to the container, if there's such a container
* */
function onNavButtonClick(event)
{
  //The clicked button
  var $button = $(this);

  //The slide the button points to
  var $slide = $($button.attr("href"));

  //If the slide exists, we go to it
  if($slide.length)
  {
    goToSlide($slide);
    event.preventDefault();
  }
}

/*
*   Getting the pressed key. Only if it's up or down arrow, we go to prev or next slide and prevent default behaviour
*   This way, if there's text input, the user is still able to fill it
* */
function onKeyDown(event)
{

  var PRESSED_KEY = event.keyCode;

  if(PRESSED_KEY == keyCodes.UP)
  {
    goToPrevSlide();
    event.preventDefault();
  }
  else if(PRESSED_KEY == keyCodes.DOWN)
  {
    goToNextSlide();
    event.preventDefault();
  }

}

function transitionPage(sectionId) {
  // List all section IDs
  const sectionIds = ['homesection', 'aboutSection', 'projectsSection', 'contactSection'];

  // Loop through each section and apply the correct display style
  sectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (id === sectionId) {
      if (id === 'homesection') {
        section.style.display = 'flex'; // Restore flex layout for homesection
      } else {
        section.style.display = 'block'; // Use block display for others
      }
    } else {
      section.style.display = 'none'; // Hide other sections
    }
  });

  // Ensure sidebar or any additional elements are hidden if necessary
  hideSidebar();

  // Keep navigation buttons visible by ensuring the function doesn't manipulate them
  // Optionally, you can add logic to highlight the active button if desired
  highlightActiveButton(sectionId);
}

// Optional function to highlight the active button
function highlightActiveButton(activeId) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.textContent.toLowerCase() === activeId.replace('Section', '').toLowerCase()) {
      link.classList.add('active'); // Add an active class for styling
    } else {
      link.classList.remove('active'); // Remove the active class from others
    }
  });
}






async function sendMessage() {
  const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value,
  };

  try {
      const response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
          alert('Message sent successfully!');
      } else {
          alert('Error sending message.');
      }
  } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message' + error.message);
  }
}

// Call this function on button click
function showContactSection() {
  const contactSection = document.getElementById('contactSection');
  
  // Set display to block
  contactSection.style.display = 'block';
  
  // Optionally trigger animations
  contactSection.style.opacity = '1'; // Ensuring the opacity is set for fade-in effect
  
  // You can also set animations via classes instead of inline styles for better practice
  // e.g., contactSection.classList.add('fade-in');
}
