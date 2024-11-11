// Define images for each section
const heroImages = [
    'images/IMG_3685.jpg', 'images/IMG_3684.jpg', 'images/img_3686.jpg',
    'images/IMG_3689.jpg', 'images/img_3682.jpg'
];
const featuresImages = [
    'images/aje1.jpeg', 'images/aje2.jpeg', 'images/aje3.jpeg',
    'images/aje4.jpeg', 'images/aje5.jpeg'
];
const listingsImages = [
    'images/aje6.jpeg', 'images/aje7.jpeg', 'images/img_3691.jpg',
    'images/aje9.jpeg', 'images/aje10.jpeg'
];
const testimonialsImages = [
    'images/aje11.jpeg', 'images/aje12.jpeg', 'images/aje13.jpeg', 'images/IMG_3689.jpg',
];
const contactImages = [
    'images/aje13.jpeg', 'images/aje7.jpeg', 'images/aje6.jpeg',
];

// Shuffle Array for Randomization
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

// Set Background Images for Sections with Fade Animation
function assignBackgroundImages(sectionId, images) {
    const section = document.querySelector(sectionId);
    const shuffledImages = shuffleArray([...images]);  // Shuffle images for randomness
    let imageIndex = 0;

    // Update Background Image with fade animation
    function updateBackgroundImage() {
        section.style.opacity = '0'; // Start fade out
        setTimeout(() => {
            section.style.backgroundImage = `url(${shuffledImages[imageIndex]})`;
            section.style.backgroundSize = 'cover';
            section.style.backgroundPosition = 'center';
            section.style.transition = 'background 1s ease, opacity 1s ease'; // Smooth transition
            section.style.opacity = '1'; // Fade in after background change
            imageIndex = (imageIndex + 1) % shuffledImages.length;
        }, 500); // Adjust timeout to match CSS transition duration
    }

    updateBackgroundImage();
    setInterval(updateBackgroundImage, Math.floor(Math.random() * 8000) + 7000); // Randomize the time between transitions
}

// Initialize All Backgrounds
function assignAllBackgrounds() {
    assignBackgroundImages('#hero', heroImages);
    assignBackgroundImages('#features', featuresImages);
    assignBackgroundImages('#listings', listingsImages);
    assignBackgroundImages('#testimonials', testimonialsImages);
    assignBackgroundImages('#contact', contactImages); // Ensure this is assigned as well
}

// Initial Background Assignment on Load
document.addEventListener('DOMContentLoaded', () => {
    assignAllBackgrounds();
    handleScrollAnimations();
});

// Smooth Scrolling Function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Function to handle scroll animations for paragraphs
function handleParagraphVisibility() {
    const paragraphs = document.querySelectorAll('p.hidden');  // Select all hidden paragraphs
    paragraphs.forEach(paragraph => {
        const paragraphTop = paragraph.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (paragraphTop < windowHeight * 0.8) {
            paragraph.classList.add('visible');  // Add 'visible' class when in view
        } else {
            paragraph.classList.remove('visible');  // Remove class when out of view
        }
    });
}

// Scroll Event Listener to Trigger Paragraph Visibility
window.addEventListener('scroll', handleParagraphVisibility);

// Initial call to handle visibility of paragraphs when page is loaded
document.addEventListener('DOMContentLoaded', handleParagraphVisibility);


// Scroll Event Listener to Trigger Paragraph Visibility
window.addEventListener('scroll', handleParagraphVisibility);

// Intersection Observer for Scroll Animations (alternative to scroll events)
function observeParagraphs() {
    const observerOptions = {
        root: null,  // The viewport
        threshold: 0.2  // Trigger when 20% of the element is in the viewport
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');  // Add 'visible' class when in view
            } else {
                entry.target.classList.remove('visible');  // Remove class when out of view
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const paragraphs = document.querySelectorAll('.paragraph');
    paragraphs.forEach(paragraph => {
        observer.observe(paragraph);
    });
}

// Initialize Intersection Observer for Paragraph Visibility
document.addEventListener('DOMContentLoaded', () => {
    observeParagraphs();
});

// CSS for Paragraph Visibility Animation
document.styleSheets[0].insertRule(`
    .paragraph {
        opacity: 0;
        transition: opacity 1s ease;
    }
    .paragraph.visible {
        opacity: 1;
    }
`, document.styleSheets[0].cssRules.length);

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}
