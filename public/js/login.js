// Switch between login and register tabs
function switchTab(tabName, btn) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
    });

    // Show selected tab
    const tab = document.getElementById(tabName);
    if (tab) tab.classList.add('active');

    // Add active class to clicked button if provided, otherwise try to find the button
    if (btn && btn.classList) {
        btn.classList.add('active');
    } else {
        const fallback = document.querySelector(`.tab-btn[onclick*="${tabName}"]`);
        if (fallback) fallback.classList.add('active');
    }
}

// Fill login form with demo credentials
function fillLoginDemo(email, password) {
    document.getElementById('loginEmail').value = email;
    document.getElementById('loginPassword').value = password;
    document.getElementById('loginForm').focus();
}

// Handle login
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        // Parse JSON only when appropriate, otherwise fallback to text
        let data;
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const txt = await response.text();
            data = { message: txt };
        }

        if (!response.ok) {
            alert(`Error: ${data.message || response.statusText}`);
            return;
        }

        // Store token
        localStorage.setItem('token', data.token);
        alert(`Welcome, ${data.user.name}!`);

        // Redirect to home page
        window.location.href = '/';
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred. Please try again.');
    }
}

// Handle registration
async function handleRegister(event) {
    event.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(`Error: ${data.message}`);
            return;
        }

        alert('Registration successful! Please sign in with your credentials.');

        // Switch to login tab
        document.getElementById('login').classList.add('active');
        document.getElementById('register').classList.remove('active');
        document.querySelectorAll('.tab-btn')[0].classList.add('active');
        document.querySelectorAll('.tab-btn')[1].classList.remove('active');

        // Fill login form
        document.getElementById('loginEmail').value = email;
        document.getElementById('loginPassword').value = '';
        document.getElementById('loginPassword').focus();
    } catch (error) {
        console.error('Registration error:', error);
        alert('An error occurred. Please try again.');
    }
}

// Programmatic submit helper for the login page
function submitLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;
    try {
        if (typeof form.requestSubmit === 'function') return form.requestSubmit();
    } catch (e) {
        console.warn('requestSubmit failed', e);
    }
    try {
        return form.submit();
    } catch (e) {
        console.warn('form.submit failed', e);
    }
    try {
        handleLogin({ preventDefault: () => {} });
    } catch (e) {
        console.error('submitLoginForm fallback failed', e);
    }
}