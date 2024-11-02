function toggleCard(card) {
    const description = card.querySelector('.description'); // Select the description paragraph
    
    // Toggle the 'active' class on the card
    card.classList.toggle('active');
    
    // If the card has the 'active' class, show the description
    if (card.classList.contains('active')) {
        description.style.display = 'block'; // Show the description
        setTimeout(() => {
            description.style.opacity = '1'; // Fade in effect
        }, 10); // Timeout to allow display to take effect
    } else {
        description.style.opacity = '0'; // Fade out effect
        setTimeout(() => {
            description.style.display = 'none'; // Hide the description after fading out
        }, 500); // Match this duration with the CSS transition duration
    }
}