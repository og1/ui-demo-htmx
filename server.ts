import index from "./index.html";

const getToastIcon = (type: string) => {
  switch (type) {
    case 'success': return '✓';
    case 'error': return '✕';
    case 'warning': return '⚠';
    case 'info': return 'ℹ';
    default: return 'ℹ';
  }
};

const server = Bun.serve({
  port: process.env.PORT || 3000,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method;

    // Main page
    if (path === "/" && method === "GET") {
      return new Response(Bun.file("./index.html"));
    }

    // Static files
    if (path === "/styles.css" && method === "GET") {
      return new Response(Bun.file("./styles.css"));
    }
    
    if (path === "/app.js" && method === "GET") {
      return new Response(Bun.file("./app.js"));
    }

    // Toast endpoint
    if (path === "/toast" && method === "POST") {
      const formData = await req.formData();
      const type = formData.get('type');
      const message = formData.get('message');
      const id = Date.now();
      const icon = getToastIcon(type);
      
      const toastHtml = `
        <div class="toast toast-${type}" id="toast-${id}">
          <div class="toast-content">
            <span class="toast-icon">${icon}</span>
            ${message}
          </div>
        </div>
        <script>
          setTimeout(() => {
            const toast = document.getElementById('toast-${id}');
            if (toast) toast.remove();
          }, 4000);
        </script>
      `;
      
      return new Response(toastHtml, {
        headers: { "Content-Type": "text/html" }
      });
    }

    // Modal endpoints
    if (path === "/modal/confirm" && method === "GET") {
      const modalHtml = `
        <div class="modal-overlay" onclick="closeModal()">
          <div class="modal" onclick="event.stopPropagation()">
            <div class="modal-header">
              <h3>Confirm Action</h3>
              <button class="modal-close" onclick="closeModal()">✕</button>
            </div>
            <div class="modal-content">
              <p>Are you sure you want to proceed with this action? This cannot be undone.</p>
            </div>
            <div class="modal-actions">
              <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
              <button class="btn btn-primary" onclick="confirmAction()">Confirm</button>
            </div>
          </div>
        </div>
      `;
      
      return new Response(modalHtml, {
        headers: { "Content-Type": "text/html" }
      });
    }

    if (path === "/modal/info" && method === "GET") {
      const modalHtml = `
        <div class="modal-overlay" onclick="closeModal()">
          <div class="modal" onclick="event.stopPropagation()">
            <div class="modal-header">
              <h3>Information</h3>
              <button class="modal-close" onclick="closeModal()">✕</button>
            </div>
            <div class="modal-content">
              <p>This is an informational modal with some details about your account settings and preferences.</p>
            </div>
            <div class="modal-actions">
              <button class="btn btn-primary" onclick="closeModal()">OK</button>
            </div>
          </div>
        </div>
      `;
      
      return new Response(modalHtml, {
        headers: { "Content-Type": "text/html" }
      });
    }

    // Form endpoints
    if (path === "/form/input" && method === "POST") {
      const formData = await req.formData();
      const value = formData.get('value');
      
      if (value && value.toString().length > 0) {
        return new Response(`<span class="feedback-text">Input: "${value}"</span>`, {
          headers: { "Content-Type": "text/html" }
        });
      }
      
      return new Response('', {
        headers: { "Content-Type": "text/html" }
      });
    }

    if (path === "/form/email" && method === "POST") {
      const formData = await req.formData();
      const email = formData.get('value');
      
      if (email) {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toString());
        const feedback = isValid 
          ? `<span class="feedback-text">Valid email: ${email}</span>`
          : `<span class="feedback-text error">Invalid email format</span>`;
        
        return new Response(feedback, {
          headers: { "Content-Type": "text/html" }
        });
      }
      
      return new Response('', {
        headers: { "Content-Type": "text/html" }
      });
    }

    if (path === "/form/password" && method === "POST") {
      const formData = await req.formData();
      const password = formData.get('value');
      
      if (password) {
        const length = password.toString().length;
        const strength = length < 6 ? 'Weak' : length < 10 ? 'Medium' : 'Strong';
        const strengthClass = length < 6 ? 'error' : length < 10 ? 'warning' : 'success';
        
        return new Response(`<span class="feedback-text ${strengthClass}">Password strength: ${strength} (${length} chars)</span>`, {
          headers: { "Content-Type": "text/html" }
        });
      }
      
      return new Response('', {
        headers: { "Content-Type": "text/html" }
      });
    }

    if (path === "/form/number" && method === "POST") {
      const formData = await req.formData();
      const number = formData.get('value');
      
      if (number) {
        const num = Number(number);
        const feedback = isNaN(num) 
          ? `<span class="feedback-text error">Not a valid number</span>`
          : `<span class="feedback-text">Number: ${num}</span>`;
        
        return new Response(feedback, {
          headers: { "Content-Type": "text/html" }
        });
      }
      
      return new Response('', {
        headers: { "Content-Type": "text/html" }
      });
    }

    if (path === "/form/date" && method === "POST") {
      const formData = await req.formData();
      const date = formData.get('value');
      
      if (date) {
        const dateObj = new Date(date.toString());
        const formatted = dateObj.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        
        return new Response(`<span class="feedback-text">Selected: ${formatted}</span>`, {
          headers: { "Content-Type": "text/html" }
        });
      }
      
      return new Response('', {
        headers: { "Content-Type": "text/html" }
      });
    }

    if (path === "/form/color" && method === "POST") {
      const formData = await req.formData();
      const color = formData.get('value');
      
      return new Response(`<span class="feedback-text">Color: ${color}</span>`, {
        headers: { "Content-Type": "text/html" }
      });
    }

    if (path === "/form/file" && method === "POST") {
      const formData = await req.formData();
      const file = formData.get('value') as File;
      
      if (file && file.size > 0) {
        const sizeMB = (file.size / 1024 / 1024).toFixed(2);
        return new Response(`<span class="feedback-text">Uploaded: ${file.name} (${sizeMB} MB)</span>`, {
          headers: { "Content-Type": "text/html" }
        });
      }
      
      return new Response('', {
        headers: { "Content-Type": "text/html" }
      });
    }

    if (path === "/form/textarea" && method === "POST") {
      const formData = await req.formData();
      const text = formData.get('value');
      
      if (text) {
        const wordCount = text.toString().trim().split(/\s+/).length;
        const charCount = text.toString().length;
        
        return new Response(`<span class="feedback-text">${wordCount} words, ${charCount} characters</span>`, {
          headers: { "Content-Type": "text/html" }
        });
      }
      
      return new Response('', {
        headers: { "Content-Type": "text/html" }
      });
    }

    if (path === "/form/multiselect" && method === "POST") {
      const formData = await req.formData();
      const selected = formData.getAll('value');
      
      if (selected.length > 0) {
        return new Response(`<span class="feedback-text">Selected: ${selected.join(', ')}</span>`, {
          headers: { "Content-Type": "text/html" }
        });
      }
      
      return new Response(`<span class="feedback-text">No languages selected</span>`, {
        headers: { "Content-Type": "text/html" }
      });
    }

    if (path === "/form/radio" && method === "POST") {
      const formData = await req.formData();
      const theme = formData.get('value');
      
      return new Response(`<span class="feedback-text">Theme: ${theme}</span>`, {
        headers: { "Content-Type": "text/html" }
      });
    }

    if (path === "/form/checkbox" && method === "POST") {
      const formData = await req.formData();
      const features = formData.getAll('value');
      
      if (features.length > 0) {
        return new Response(`<span class="feedback-text">Enabled: ${features.join(', ')}</span>`, {
          headers: { "Content-Type": "text/html" }
        });
      }
      
      return new Response(`<span class="feedback-text">No features enabled</span>`, {
        headers: { "Content-Type": "text/html" }
      });
    }

    if (path === "/form/search" && method === "POST") {
      const formData = await req.formData();
      const query = formData.get('value');
      
      if (query && query.toString().length > 0) {
        // Simulate search results
        const results = Math.floor(Math.random() * 1000) + 1;
        return new Response(`<span class="feedback-text">Found ${results} results for "${query}"</span>`, {
          headers: { "Content-Type": "text/html" }
        });
      }
      
      return new Response('', {
        headers: { "Content-Type": "text/html" }
      });
    }

    if (path === "/form/rating" && method === "POST") {
      const { rating } = await req.json();
      
      const messages = {
        1: "Poor - We'll work on improvements",
        2: "Fair - Thanks for the feedback", 
        3: "Good - Glad you're satisfied",
        4: "Very Good - We appreciate it!",
        5: "Excellent - You made our day!"
      };
      
      return new Response(`<span class="feedback-text">${rating}/5 stars - ${messages[rating] || 'Thanks!'}</span>`, {
        headers: { "Content-Type": "text/html" }
      });
    }

    if (path === "/form/select" && method === "POST") {
      const formData = await req.formData();
      const value = formData.get('value');
      
      return new Response(`<span class="feedback-text">Selected: ${value}</span>`, {
        headers: { "Content-Type": "text/html" }
      });
    }

    if (path === "/form/slider" && method === "POST") {
      const formData = await req.formData();
      const value = formData.get('value');
      
      return new Response(`<span class="feedback-text">Slider value: ${value}</span>`, {
        headers: { "Content-Type": "text/html" }
      });
    }

    if (path === "/form/toggle" && method === "POST") {
      const { name } = await req.json();
      
      return new Response(`<span class="feedback-text">Toggle "${name}" changed</span>`, {
        headers: { "Content-Type": "text/html" }
      });
    }

    // Card endpoint
    if (path === "/card/action" && method === "POST") {
      const { card } = await req.json();
      
      return new Response(`<span class="feedback-text">Action performed on ${card} card</span>`, {
        headers: { "Content-Type": "text/html" }
      });
    }

    // Loading demo endpoint
    if (path === "/loading/demo" && method === "GET") {
      // Simulate some processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return new Response(`<div class="feedback-text">Loading complete! Data loaded successfully.</div>`, {
        headers: { "Content-Type": "text/html" }
      });
    }

    // 404 for unhandled routes
    return new Response("Not Found", { status: 404 });
  },
  development: {
    hmr: true,
    console: true,
  },
});

console.log(`🚀 UI Demo with HTMX running at http://localhost:${server.port}`);
console.log("Features included:");
console.log("• Typography (Inter, JetBrains Mono, Playfair Display)");
console.log("• Buttons (Primary, Secondary, Success, Warning, Danger, Ghost, Outline)");
console.log("• Toast notifications with HTMX (Success, Error, Warning, Info)");
console.log("• Modal dialogs with HTMX");
console.log("• Form controls with live feedback via HTMX");
console.log("• Cards & containers with server interactions");
console.log("• Loading states (Spinner, Skeleton, Progress bar, HTMX indicators)");