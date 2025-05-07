// Button click event
document.getElementById('click-me').addEventListener('click', function() {
    this.textContent = 'Clicked!';
    this.style.backgroundColor = '#4CAF50';
    this.style.color = 'white';
});

// Hover effects
const hoverArea = document.getElementById('hover-area');
hoverArea.addEventListener('mouseover', function() {
    this.style.backgroundColor = '#2196F3';
    this.textContent = 'Mouse is over me!';
});

hoverArea.addEventListener('mouseout', function() {
    this.style.backgroundColor = '#f0f0f0';
    this.textContent = 'Hover Over Me!';
});

// Keypress detection
const keypressInput = document.getElementById('keypress-input');
const keypressOutput = document.getElementById('keypress-output');

keypressInput.addEventListener('keyup', function(e) {
    keypressOutput.textContent = `You typed: ${e.target.value}`;
});

// Secret double-click action
const secretArea = document.getElementById('secret-area');
secretArea.addEventListener('dblclick', function() {
    this.textContent = '🎉 Surprise! You found the secret! 🎉';
    this.style.backgroundColor = '#ff5722';
    this.style.color = 'white';
    
    // Add confetti effect (simple version)
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-20px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.borderRadius = '50%';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
});

// Add CSS for confetti animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Color changing button
const colorChanger = document.getElementById('color-changer');
const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF'];
let colorIndex = 0;

colorChanger.addEventListener('click', function() {
    colorIndex = (colorIndex + 1) % colors.length;
    this.style.backgroundColor = colors[colorIndex];
    this.style.color = 'white';
});

// Image gallery
const images = document.querySelectorAll('.gallery img');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
let currentImageIndex = 0;

function showImage(index) {
    images.forEach(img => img.classList.remove('active'));
    images[index].classList.add('active');
}

prevBtn.addEventListener('click', function() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(currentImageIndex);
});

nextBtn.addEventListener('click', function() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
});

// Auto-advance gallery every 3 seconds
setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
}, 3000);

// Accordion functionality
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const isOpen = content.classList.contains('show');
        
        // Close all accordion items
        document.querySelectorAll('.accordion-content').forEach(item => {
            item.classList.remove('show');
        });
        
        // Open clicked one if it wasn't already open
        if (!isOpen) {
            content.classList.add('show');
        }
    });
});



const form = document.getElementById('user-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Real-time validation
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);

function validateName() {
    const errorElement = nameInput.nextElementSibling;
    if (nameInput.value.trim() === '') {
        errorElement.textContent = 'Name is required';
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validateEmail() {
    const errorElement = emailInput.nextElementSibling;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailInput.value === '') {
        errorElement.textContent = '';
        return true; // Email is optional in this example
    } else if (!emailRegex.test(emailInput.value)) {
        errorElement.textContent = 'Please enter a valid email address';
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validatePassword() {
    const errorElement = passwordInput.nextElementSibling;
    if (passwordInput.value.length > 0 && passwordInput.value.length < 8) {
        errorElement.textContent = 'Password must be at least 8 characters';
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    if (isNameValid && isEmailValid && isPasswordValid) {
        alert('Form submitted successfully!');
        form.reset();
        
        // In a real app, you would send data to server here
    } else {
        alert('Please fix the errors in the form');
    }
});