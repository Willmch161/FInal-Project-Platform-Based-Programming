// Auth state
console.log('auth.js loaded');
let isLoggedIn = false;
let currentUser = null;
let authMode = 'login'; // 'login' or 'register'

// Dark Mode Toggle
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Save preference to localStorage
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);

    // Update icon
    const darkModeBtn = document.getElementById('darkModeBtn');
    if (isDarkMode) {
        darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        darkModeBtn.style.color = '#ffc107';
    } else {
        darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        darkModeBtn.style.color = '';
    }
}

// Load dark mode preference on page load
function loadDarkModePreference() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        const darkModeBtn = document.getElementById('darkModeBtn');
        if (darkModeBtn) {
            darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
            darkModeBtn.style.color = '#ffc107';
        }
    }
}

// Force login before showing dashboard: disable nav for guests and open modal
function disableNavigation() {
    document.querySelectorAll('.nav-link').forEach(a => a.classList.add('disabled'));
}

function enableNavigation() {
    document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('disabled'));
}

// Bind form submit handler ASAP
function attachFormSubmit() {
    try {
        const form = document.getElementById('authForm');
        if (!form) {
            console.warn('authForm not found');
            return;
        }
        form.removeEventListener('submit', handleAuth);
        form.addEventListener('submit', handleAuth);
        console.log('Form submit listener attached');
    } catch (e) {
        console.error('Failed to attach form submit:', e);
    }
}

// Try to attach immediately if DOM is ready; otherwise wait for DOMContentLoaded
if (document.readyState !== 'loading') {
    attachFormSubmit();
    loadDarkModePreference();
}
document.addEventListener('DOMContentLoaded', () => {
    attachFormSubmit();
    loadDarkModePreference();

    const token = localStorage.getItem('token');
    if (token) {
        fetchUserProfile(token);
    }
    updateAuthButton();

    if (!token) {
        disableNavigation();
        toggleAuth();
    } else {
        enableNavigation();
    }
});

// Handle auth button click - redirect to login page or logout
function handleAuthClick(event) {
    // Prevent the click from triggering other handlers (e.g., underlying links)
    if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
    }
    if (event && typeof event.stopPropagation === 'function') {
        event.stopPropagation();
        if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
    }
    console.log('handleAuthClick called, isLoggedIn=', isLoggedIn);

    // Always open the auth modal when the header button is clicked.
    // Logout should be done explicitly elsewhere (e.g., in a profile menu).
    toggleAuth();
}

// Fill demo account credentials
function fillDemo(email, password) {
    document.getElementById('email').value = email;
    document.getElementById('password').value = password;
    document.getElementById('email').focus();
}

// Toggle between login and register
function toggleAuthMode() {
    authMode = authMode === 'login' ? 'register' : 'login';
    const title = document.getElementById('authTitle');
    const subtitle = document.getElementById('authSubtitle');
    const nameGroup = document.getElementById('nameGroup');
    const toggleText = document.getElementById('toggleText');
    const submitText = document.getElementById('submitText');
    const demoAccounts = document.getElementById('demoAccounts');

    if (authMode === 'register') {
        title.textContent = 'Create Account';
        subtitle.textContent = 'Join our community';
        nameGroup.classList.remove('hidden');
        toggleText.textContent = 'Already have an account? Sign in';
        submitText.textContent = 'Create Account';
        demoAccounts.style.display = 'none';
    } else {
        title.textContent = 'Welcome Back';
        subtitle.textContent = 'Sign in to your account';
        nameGroup.classList.add('hidden');
        toggleText.textContent = "Don't have an account? Create one";
        submitText.textContent = 'Sign In';
        demoAccounts.style.display = 'block';
    }
}

// Toggle auth modal
function toggleAuth() {
    const modal = document.getElementById('authModal');
    modal.classList.toggle('hidden');
    console.log('toggleAuth: modal hidden=', modal.classList.contains('hidden'));

    if (!modal.classList.contains('hidden')) {
        // Reset form when opening
        document.getElementById('authForm').reset();
        authMode = 'login';
        document.getElementById('authTitle').textContent = 'Welcome Back';
        document.getElementById('authSubtitle').textContent = 'Sign in to your account';
        document.getElementById('submitText').textContent = 'Sign In';
        document.getElementById('nameGroup').classList.add('hidden');
        document.getElementById('demoAccounts').style.display = 'block';
    }
}

// Handle auth form submission
async function handleAuth(event) {
    event.preventDefault();
    console.log('🔐 handleAuth called, mode=', authMode);

    // Collect form values (use IDs present in the HTML)
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const passwordEl = document.getElementById('password');
    const name = nameEl ? nameEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';
    const password = passwordEl ? passwordEl.value.trim() : '';

    const endpoint = authMode === 'register' ? '/api/auth/register' : '/api/auth/login';

    try {
        // disable submit to prevent double submissions
        const submitBtn = document.getElementById('authSubmitBtn') || document.querySelector('.auth-btn');
        if (submitBtn) submitBtn.disabled = true;
        const body = authMode === 'register' ? { name, email, password } : { email, password };

        console.log('📤 Sending', authMode, 'request to', endpoint);
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (!response.ok) {
            alert(`Error: ${data.message || response.statusText}`);
            return;
        }

        if (authMode === 'login') {
            // Store token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('userRole', data.user.role);
            localStorage.setItem('userName', data.user.name);
            currentUser = data.user;
            isLoggedIn = true;

            // Show success message (fall back to alert if DOM nodes missing)
            const msgEl = document.getElementById('successMessage');
            const modalEl = document.getElementById('successModal');
            if (msgEl && modalEl) {
                msgEl.textContent = `Welcome back, ${data.user.name}!`;
                modalEl.classList.remove('hidden');
                setTimeout(() => modalEl.classList.add('hidden'), 3000);
            } else {
                alert(`Welcome back, ${data.user.name}!`);
            }

            // Close the auth modal and update UI
            toggleAuth();
            updateAuthButton();
            if (typeof loadProducts === 'function') loadProducts();
            if (typeof enableNavigation === 'function') enableNavigation();
        } else {
            alert('Registration successful! You can now login.');
            // after successful registration, attempt to log in automatically
            try {
                const loginResp = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const loginData = await loginResp.json();
                if (loginResp.ok) {
                    localStorage.setItem('token', loginData.token);
                    currentUser = loginData.user;
                    isLoggedIn = true;
                    updateAuthButton();
                    if (typeof enableNavigation === 'function') enableNavigation();
                    toggleAuth();
                    if (typeof loadProducts === 'function') loadProducts();
                    return;
                }
            } catch (e) {
                console.warn('Auto-login after register failed', e);
            }
            authMode = 'login';
            document.getElementById('authTitle').textContent = 'Login';
            document.getElementById('nameGroup').classList.add('hidden');
            document.getElementById('authForm').reset();
        }
    } catch (error) {
        console.error('❌ Auth error:', error);
        alert('An error occurred. Please try again.');
    } finally {
        const submitBtn = document.getElementById('authSubmitBtn') || document.querySelector('.auth-btn');
        if (submitBtn) submitBtn.disabled = false;
    }
}

// Fetch user profile to restore login state
async function fetchUserProfile(token) {
    try {
        const response = await fetch('/api/auth/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            localStorage.removeItem('token');
            return;
        }

        const data = await response.json();
        currentUser = data.user;
        isLoggedIn = true;
        updateAuthButton();
        loadProducts();

    } catch (error) {
        console.error('Profile fetch error:', error);
        localStorage.removeItem('token');
    }
}

// Update auth button based on login state
function updateAuthButton() {
    const authBtn = document.getElementById('authBtn');

    // Always bind the header button to open the auth modal (no automatic logout)
    if (isLoggedIn && currentUser) {
        authBtn.textContent = `${currentUser.name} (${currentUser.role})`;
    } else {
        authBtn.textContent = 'Login';
    }
    // Update header user display
    const headerUserName = document.getElementById('headerUserName');
    const userDropdown = document.getElementById('userDropdown');
    if (headerUserName) headerUserName.textContent = (isLoggedIn && currentUser) ? currentUser.name : '';
    if (userDropdown) {
        if (isLoggedIn) userDropdown.classList.remove('hidden');
        else userDropdown.classList.add('hidden');
    }

    // Remove any inline onclick handlers then add a single listener
    authBtn.onclick = null;
    authBtn.removeEventListener('click', handleAuthClick);
    authBtn.addEventListener('click', handleAuthClick);
}

// Toggle user menu dropdown
function toggleMenuDropdown() {
    const menu = document.getElementById('userMenu');
    const arrow = document.getElementById('userMenuArrow');
    if (!menu) return;
    menu.classList.toggle('hidden');
    arrow.classList.toggle('active');
}

// Toggle individual menu items
function toggleMenuItem(event, action) {
    event.preventDefault();
    const btn = event.currentTarget;
    btn.classList.toggle('active');

    if (action === 'orders') {
        showSection('orders');
    } else if (action === 'account') {
        toggleAuth();
    } else if (action === 'logout') {
        logout();
    }
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('token');
        isLoggedIn = false;
        currentUser = null;
        updateAuthButton();
        loadProducts();
        showSection('products');
        alert('Logged out successfully!');
    }
}

// Show/hide sections
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');

        // Load data based on section
        if (sectionId === 'products') {
            loadProducts();
        } else if (sectionId === 'orders') {
            if (!isLoggedIn) {
                alert('You must be logged in to view orders');
                toggleAuth();
                return;
            }
            loadOrders();
        } else if (sectionId === 'collections') {
            loadCollections();
        } else if (sectionId === 'lookbook') {
            loadLookbook();
        }
    }
}

// Helper to get auth header
function getAuthHeader() {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// Programmatic submit helper used by Sign In button
function submitAuthForm() {
    const form = document.getElementById('authForm');
    if (!form) return;
    try {
        if (typeof form.requestSubmit === 'function') {
            return form.requestSubmit();
        }
    } catch (e) {
        console.warn('requestSubmit failed', e);
    }
    // Avoid form.submit() because it will bypass submit handlers; dispatch instead.
    try {
        const ev = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(ev);
        return;
    } catch (e) {
        console.warn('dispatchEvent submit failed', e);
    }
    // fallback: call handler directly
    try {
        handleAuth({ preventDefault: () => {}, target: form });
    } catch (e) {
        console.error('submitAuthForm fallback failed', e);
    }
}

// Programmatic submit helper for backward compatibility
function submitAuthForm() {
    const form = document.getElementById('authForm');
    if (!form) return;
    if (typeof form.requestSubmit === 'function') {
        return form.requestSubmit();
    }
    const ev = new Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(ev);
}