const port = "3000";

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
  }, i * 80);
}

function animateLetterIn(nw, i) {
  setTimeout(function() {
    nw[i].className = 'letter in';
  }, 340 + (i * 80));
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

// Function to scroll to a section
function transitionPage(sectionId) {
  const section = document.getElementById(sectionId);
  
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}


// Function to highlight the active button
function highlightActiveButton(activeId) {
  const navLinks = document.querySelectorAll('nav a'); // Adjust selector as necessary
  navLinks.forEach(link => {
    // Compare the href with activeId
    if (link.getAttribute('href').substring(1) === activeId) {
      link.classList.add('active'); // Highlight active button
    } else {
      link.classList.remove('active'); // Remove highlight from inactive buttons
    }
  });
}

// Backend - Function to send message
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
    alert('Failed to send message: ' + error.message);
  }
}


// After camera setup
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = false; // Disable zoom if desired
const animate = () => {
  requestAnimationFrame(animate);
  globe.rotation.y += 0.001; // Rotate globe
  clouds.rotation.y += 0.0012; // Rotate clouds slightly faster
  controls.update(); // Update controls
  renderer.render(scene, camera);
};
function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll effect
  })}