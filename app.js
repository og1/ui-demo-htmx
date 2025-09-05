// Vanilla JavaScript for UI interactions

// Slider value update
function updateSliderValue(value) {
  document.getElementById('slider-value').textContent = value;
  
  // Update progress bar to match slider
  const progressFill = document.getElementById('progress-fill');
  if (progressFill) {
    progressFill.style.width = value + '%';
  }
}

// Toggle switch functionality
function toggleSwitch(toggleElement) {
  toggleElement.classList.toggle('active');
}

// Modal functions
function closeModal() {
  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = '';
}

function confirmAction() {
  // Add a toast to show confirmation
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  const id = Date.now();
  
  toast.innerHTML = `
    <div class="toast toast-success" id="toast-${id}">
      <div class="toast-content">
        <span class="toast-icon">✓</span>
        Action confirmed successfully!
      </div>
    </div>
  `;
  
  toastContainer.appendChild(toast);
  
  // Auto-remove toast after 4 seconds
  setTimeout(() => {
    const toastElement = document.getElementById(`toast-${id}`);
    if (toastElement) {
      toastElement.remove();
    }
  }, 4000);
  
  // Close modal
  closeModal();
}

// Rating functionality
function handleRating(event) {
  if (event.target.classList.contains('star')) {
    const rating = parseInt(event.target.dataset.value);
    const stars = event.target.parentElement.querySelectorAll('.star');
    
    // Update star display
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
    
    // Send rating to server
    fetch('/form/rating', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating: rating })
    })
    .then(response => response.text())
    .then(html => {
      document.getElementById('rating-feedback').innerHTML = html;
    });
  }
}

// Handle star hover effects
document.addEventListener('mouseover', function(event) {
  if (event.target.classList.contains('star')) {
    const rating = parseInt(event.target.dataset.value);
    const stars = event.target.parentElement.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
      if (index < rating) {
        star.style.color = '#fbbf24';
      } else {
        star.style.color = '#9ca3af';
      }
    });
  }
});

document.addEventListener('mouseout', function(event) {
  if (event.target.classList.contains('star')) {
    const stars = event.target.parentElement.querySelectorAll('.star');
    
    stars.forEach(star => {
      if (star.classList.contains('active')) {
        star.style.color = '#fbbf24';
      } else {
        star.style.color = '#9ca3af';
      }
    });
  }
});

// Handle keyboard events
document.addEventListener('keydown', function(event) {
  // Close modal on Escape key
  if (event.key === 'Escape') {
    closeModal();
  }
});

// Auto-remove old toasts if too many accumulate
function cleanupToasts() {
  const toastContainer = document.getElementById('toast-container');
  const toasts = toastContainer.children;
  
  // Keep only the last 5 toasts
  while (toasts.length > 5) {
    toasts[0].remove();
  }
}

// Run cleanup periodically
setInterval(cleanupToasts, 5000);

// Add loading indicator styles for HTMX
document.addEventListener('DOMContentLoaded', function() {
  // Add some custom HTMX event listeners for better UX
  document.body.addEventListener('htmx:beforeRequest', function(evt) {
    // Add loading class to buttons during requests
    if (evt.detail.elt.classList.contains('btn')) {
      evt.detail.elt.style.opacity = '0.7';
    }
  });

  document.body.addEventListener('htmx:afterRequest', function(evt) {
    // Remove loading state from buttons
    if (evt.detail.elt.classList.contains('btn')) {
      evt.detail.elt.style.opacity = '1';
    }
  });
  
  // Handle form submission feedback
  document.body.addEventListener('htmx:afterSwap', function(evt) {
    // If we just swapped in a toast, clean up old ones
    if (evt.detail.target.id === 'toast-container') {
      cleanupToasts();
    }
  });
});

console.log('🎨 UI Demo JavaScript loaded - HTMX interactions ready!');