// Community Request-Offer-Match Animation

document.addEventListener('DOMContentLoaded', function() {
  // Check if animation container exists
  const animationContainer = document.querySelector('.animation-container');
  if (!animationContainer) return;
  
  // Start the animation sequence when the element comes into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Start the animation after a small delay
        setTimeout(() => {
          startAnimation();
        }, 500);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  observer.observe(animationContainer);
  
  // For repeating the animation on click
  const replayBtn = document.querySelector('.replay-animation');
  if (replayBtn) {
    replayBtn.addEventListener('click', function() {
      resetAnimation();
      setTimeout(() => {
        startAnimation();
      }, 500);
    });
  }
});

// Animation sequence control
function startAnimation() {
  // Show the request
  setTimeout(() => showRequest(), 0);
  
  // Show offers after request appears
  setTimeout(() => showOffers(), 2000);
  
  // Select an offer and show match
  setTimeout(() => selectOffer(), 5000);
  
  // Hide cards and show match
  setTimeout(() => hideCardsAndShowMatch(), 7000);
  
  // Reset after complete cycle
  setTimeout(() => resetAnimation(), 12000);
  
  // Start again after complete cycle and reset
  setTimeout(() => startAnimation(), 13000);
}

// Show the community request
function showRequest() {
  const requestCard = document.querySelector('.request-card');
  if (requestCard) {
    requestCard.classList.add('animate-fadeInUp');
  }
}

// Show community offers
function showOffers() {
  const offerCards = document.querySelectorAll('.offer-card');
  offerCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate-fadeInUp');
    }, index * 800); // Stagger the appearance of offers
  });
}

// Select one offer and hide others
function selectOffer() {
  const offerCards = document.querySelectorAll('.offer-card');
  const selectedIndex = 1; // We'll always select the second offer for the demo
  const requestCard = document.querySelector('.request-card');
  
  // First change request card color to accent
  if (requestCard) {
    requestCard.classList.add('request-selected');
  }
  
  offerCards.forEach((card, index) => {
    if (index !== selectedIndex) {
      // Fade out non-selected offers
      card.classList.remove('animate-fadeInUp');
      card.classList.add('animate-fadeOutDown');
    } else {
      // Add selected class to the chosen offer
      setTimeout(() => {
        card.classList.add('selected-offer');
        
        // Show the connector line and match icon
        const connectorLine = document.querySelector('.connector-line');
        
        if (requestCard && connectorLine && card) {
          // Get the center positions of the request and selected offer card
          const requestRect = requestCard.getBoundingClientRect();
          const offerRect = card.getBoundingClientRect();
          const containerRect = document.querySelector('.animation-container').getBoundingClientRect();
          
          // Calculate the positions relative to the animation container
          const startX = (requestRect.left + requestRect.width / 2) - containerRect.left;
          const startY = (requestRect.top + requestRect.height / 2) - containerRect.top;
          const endX = (offerRect.left + offerRect.width / 2) - containerRect.left;
          const endY = (offerRect.top + offerRect.height / 2) - containerRect.top;
          
          // Calculate the line length and angle
          const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
          const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
          
          // Position the connector line
          connectorLine.style.width = `${length}px`;
          connectorLine.style.left = `${startX}px`;
          connectorLine.style.top = `${startY}px`;
          connectorLine.style.transform = `rotate(${angle}deg) scaleX(1)`;
          
          // Show the match icon at the midpoint
          const matchIcon = document.querySelector('.match-icon');
          if (matchIcon) {
            matchIcon.style.left = `${startX + (endX - startX) / 2 - 30}px`;
            matchIcon.style.top = `${startY + (endY - startY) / 2 - 30}px`;
            setTimeout(() => {
              matchIcon.classList.add('animate-popIn', 'animate-pulseGlow');
            }, 500);
          }
        }
      }, 300);
    }
  });
}

// Hide all cards and show the match
function hideCardsAndShowMatch() {
  // Fade out the request card
  const requestCard = document.querySelector('.request-card');
  if (requestCard) {
    requestCard.classList.remove('animate-fadeInUp');
    requestCard.classList.add('animate-fadeOutDown');
  }
  
  // Fade out all offer cards
  const offerCards = document.querySelectorAll('.offer-card');
  offerCards.forEach(card => {
    // Only fade out the selected one (others are already hidden)
    if (card.classList.contains('selected-offer')) {
      card.classList.remove('animate-fadeInUp');
      card.classList.add('animate-fadeOutDown');
    }
  });
  
  // Fade out the match icon
  const matchIcon = document.querySelector('.match-icon');
  if (matchIcon) {
    matchIcon.classList.remove('animate-popIn', 'animate-pulseGlow');
    matchIcon.classList.add('animate-fadeOutDown');
  }
  
  // Hide the connector line
  const connectorLine = document.querySelector('.connector-line');
  if (connectorLine) {
    // Fade out the line by reducing opacity
    connectorLine.style.opacity = '0';
    connectorLine.style.transition = 'opacity 0.5s ease';
  }
  
  // Show the match card after a short delay
  setTimeout(() => {
    const matchCard = document.querySelector('.match-card');
    if (matchCard) {
      matchCard.classList.add('animate-showMatch');
    }
  }, 600);
}

// Reset everything for replay
function resetAnimation() {
  // Get all animated elements
  const cards = document.querySelectorAll('.community-card');
  const matchIcon = document.querySelector('.match-icon');
  const connectorLine = document.querySelector('.connector-line');
  const requestCard = document.querySelector('.request-card');
  
  // Reset cards
  cards.forEach(card => {
    card.classList.remove(
      'animate-fadeInUp', 
      'animate-fadeOutDown', 
      'animate-slideInFromLeft', 
      'animate-slideInFromRight',
      'selected-offer',
      'animate-showMatch'
    );
  });
  
  // Reset request card
  if (requestCard) {
    requestCard.classList.remove('request-selected');
  }
  
  // Reset match icon
  if (matchIcon) {
    matchIcon.classList.remove('animate-popIn', 'animate-pulseGlow', 'animate-fadeOutDown');
    matchIcon.style.opacity = '';
  }
  
  // Reset connector line
  if (connectorLine) {
    connectorLine.style.transform = 'scaleX(0)';
    connectorLine.style.opacity = '';
  }
} 