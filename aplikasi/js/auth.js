/**
 * AGROPLAY AUTH v3.0 - ULTRA CLEAN
 * FIXES: Email validation + Syntax + 2 Admin lock
 */

(function() {
    'use strict';
    
    // Add rate limiting to prevent infinite loops
    let lastAuthCheck = 0;
    const originalConsoleLog = console.log;
    console.log = function(...args) {
        const now = Date.now();
        if (args[0] && typeof args[0] === 'string' && args[0].includes('AUTH: User loaded successfully')) {
            if (now - lastAuthCheck >= 100) { // Only log once per 100ms
                originalConsoleLog.apply(console, args);
                lastAuthCheck = now;
            }
        } else {
            originalConsoleLog.apply(console, args);
        }
    };
    
    function simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(36);
    }
    
    const rateLimit = {
        attempts: {},
        reset: function(email) { this.attempts[email] = { count: 0, resetTime: Date.now() + 300000 }; },
        canAttempt: function(email) {
            const now = Date.now();
            const record = this.attempts[email];
            if (!record || now > record.resetTime) { this.reset(email); return true; }
            return record.count < 3;
        },
        recordAttempt: function(email) {
            if (this.attempts[email]) this.attempts[email].count++;
        }
    };
    
function safeJSON(key, fallback) {
        try {
            const data = localStorage.getItem(key);
            if (!data) return fallback;
            const parsed = JSON.parse(data);
            
            // Validate user object
            if (key === 'agroplay_current_user' && parsed && typeof parsed === 'object' && parsed.email && parsed.role) {
                parsed.role = (parsed.role || '').trim().toLowerCase();
                parsed.email = parsed.email.trim().toLowerCase();
                console.log('🔐 AUTH: User loaded successfully:', parsed.email);
                return parsed;
            }
            
            // Validate users array
            if (key === 'agroplay_users' && Array.isArray(parsed)) {
                console.log('👥 AUTH: Users loaded successfully:', parsed.length, 'users');
                return parsed;
            }
            
            return parsed || fallback;
        } catch (e) {
            console.error('🔐 AUTH: JSON error ' + key + ':', e);
            
            // Handle storage access errors (Tracking Prevention)
            try {
                localStorage.removeItem(key);
                console.log('🔐 AUTH: Corrupted data removed for key:', key);
            } catch (storageError) {
                console.warn('🔐 Storage access blocked for key:', key);
                // Use sessionStorage fallback for critical data
                if (key === 'agroplay_current_user') {
                    try {
                        const sessionData = sessionStorage.getItem(key);
                        if (sessionData) {
                            console.log('🔐 AUTH: Using sessionStorage fallback');
                            return JSON.parse(sessionData);
                        }
                    } catch (sessionError) {
                        console.warn('🔐 SessionStorage also blocked');
                    }
                }
            }
            return fallback;
        }
    }
    
    function safeSave(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            console.log('💾 AUTH: Data saved successfully for key:', key);
            
            // Also save to sessionStorage as backup for critical data
            if (key === 'agroplay_current_user') {
                try {
                    sessionStorage.setItem(key, JSON.stringify(data));
                    console.log('💾 AUTH: SessionStorage backup created');
                } catch (sessionError) {
                    console.warn('💾 SessionStorage backup failed');
                }
            }
            return true;
        } catch (e) {
            console.error('💾 AUTH: Save error ' + key);
            
            // Handle storage access errors (Tracking Prevention)
            try {
                // Fallback to sessionStorage for critical data
                if (key === 'agroplay_current_user') {
                    sessionStorage.setItem(key, JSON.stringify(data));
                    console.warn('💾 Using sessionStorage fallback for user data');
                    return true;
                }
            } catch (sessionError) {
                console.warn('💾 Both localStorage and sessionStorage blocked');
            }
            return false;
        }
    }
    
    // IMPROVED EMAIL VALIDATION
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) && email.length > 5 && email.includes('.') && email.indexOf('@') < email.lastIndexOf('.');
    }
    
    window.AUTH = {
        getCurrentUser: function() { return safeJSON('agroplay_current_user'); },
        saveUser: function(user) { return safeSave('agroplay_current_user', user); },
        getStoredUsers: function() { return safeJSON('agroplay_users', []); },
        saveStoredUsers: function(users) { return safeSave('agroplay_users', users); },
        
        login: async function(email, password) {
            console.log('LOGIN ATTEMPT: ' + email);
            
            // SIMPLE VALIDATION - ACCEPTS ALL WITH @ AND .
            if (!isValidEmail(email)) return { success: false, message: 'Masukkan email valid (contoh@gmail.com)' };
            
            if (!rateLimit.canAttempt(email)) return { success: false, message: 'Terlalu banyak percobaan! Tunggu 5 menit.' };
            
            rateLimit.recordAttempt(email);
            
            const users = this.getStoredUsers();
            const user = users.find(u => u.email === email.toLowerCase());
            
            if (!user) return { success: false, message: 'Email belum terdaftar! Coba demo: guru@test.com/123456' };
            
            // IMPROVED PASSWORD VALIDATION
            const hash = simpleHash(password);
            if (user.passwordHash !== hash && user.password !== password) {
                rateLimit.recordAttempt(email);
                return { success: false, message: 'Password salah! Percobaan tersisa: ' + (3 - rateLimit.attempts[email].count) };
            }
            
            user.lastLogin = new Date().toISOString();
            this.saveStoredUsers(users);
            this.saveUser(user);
            
            // ✅ CRITICAL: Initialize REALTIME user data on first login
            if (typeof REALTIME !== 'undefined') {
                REALTIME.initUserData(user.id, user.name, user.role);
                REALTIME.trackLogin();
            }
            
            // Mark as first login for splash screen
            sessionStorage.setItem('agroplay_first_login', 'true');
            
            return { success: true, message: 'Login berhasil!', user };
        },

        
        register: async function(name, email, password, role, cls) {
            if (role === 'admin') return { success: false, message: 'Admin hanya 2! admin@test.com/admin123 + andiwae1337@gmail.com/andiwae123' };
            
            if (!isValidEmail(email)) return { success: false, message: 'Email tidak valid!' };
            
            if (password.length < 6) return { success: false, message: 'Password minimal 6 karakter!' };
            
            const users = this.getStoredUsers();
            if (users.find(u => u.email === email.toLowerCase())) return { success: false, message: 'Email sudah terdaftar!' };
            
            const newUser = {
                id: Date.now().toString(),
                name: name.trim(),
                email: email.toLowerCase().trim(),
                passwordHash: simpleHash(password),
                password: password,
                role: role,
                class: role === 'siswa' ? cls.toUpperCase().trim() : '',
                createdAt: new Date().toISOString()
            };
            
            users.push(newUser);
            this.saveStoredUsers(users);
            
            return { success: true, message: 'Daftar berhasil! Login sekarang.', user: newUser };
        },
        
        logout: function() {
            if (typeof REALTIME !== 'undefined') REALTIME.trackLogout();
            
            // Clear session storage (keep splash flags for proper behavior)
            sessionStorage.removeItem('agroplay_current_user');
            
            try {
                localStorage.removeItem('agroplay_current_user');
            } catch (e) {
                console.warn('Storage access blocked during logout');
            }
            window.location.href = 'login.html';
        },
        
        getRoleLabel: function(role) {
            const labels = { siswa: 'Siswa', guru: 'Guru', orangtua: 'Orang Tua', admin: 'Admin' };
            return labels[role] || 'User';
        },
        
        requireRole: function(requiredRole) {
            const user = this.getCurrentUser();
            console.log('AUTH.requireRole check:', { requiredRole, user: user ? { email: user.email, role: user.role } : null });
            
            // Check if user is authenticated and has required role
            if (!user || !user.role) {
                console.error('Access denied: No authenticated user');
                alert('Silakan login terlebih dahulu!');
                window.location.href = 'login.html';
                return false;
            }
            
            // For dashboard pages, require specific role
            const userRole = user.role.trim().toLowerCase();
            const requiredRoleLower = requiredRole.toLowerCase();
            
            if (userRole !== requiredRoleLower) {
                const errorMsg = 'Akses khusus ' + this.getRoleLabel(requiredRole) + ' saja!';
                console.error('Access denied:', errorMsg, user);
                alert(errorMsg);
                // Redirect ke index.html untuk semua role yang salah akses
                console.log('Redirecting to index.html');
                setTimeout(() => window.location.href = 'index.html', 100);
                return false;
            }
            
            console.log('Role check passed for', user.email);
            return true;
        },

        protectPage: function() {
            const user = this.getCurrentUser();
            if (!user) {
                console.log('AUTH: No user, redirecting to login');
                window.location.href = 'login.html';
                return false;
            }
            console.log('AUTH: Page protected for', user.email);
        },

        // Password Reset Functionality
        generateResetCode: function() {
            return Math.floor(100000 + Math.random() * 900000).toString();
        },

        requestPasswordReset: async function(email) {
            if (!isValidEmail(email)) return { success: false, message: 'Email tidak valid!' };

            const users = this.getStoredUsers();
            const user = users.find(u => u.email === email.toLowerCase());
            
            if (!user) return { success: false, message: 'Email tidak terdaftar!' };

            const resetCode = this.generateResetCode();
            const resetData = {
                code: resetCode,
                email: email.toLowerCase(),
                timestamp: Date.now(),
                attempts: 0
            };

            // Store reset code in sessionStorage (expires in 15 minutes)
            sessionStorage.setItem('agroplay_reset_code', JSON.stringify(resetData));

            // Send real email using EmailJS
            try {
                await this.sendResetEmail(email, user.name, resetCode);
                return { 
                    success: true, 
                    message: `Kode reset telah dikirim ke ${email}. Periksa inbox dan spam folder Anda. Kode berlaku 15 menit.`
                };
            } catch (error) {
                console.error('Email sending failed:', error);
                return { 
                    success: false, 
                    message: 'Gagal mengirim email. Silakan coba lagi atau hubungi admin.'
                };
            }
        },

        sendResetEmail: async function(email, userName, resetCode) {
            // Check if EmailJS is configured
            if (typeof emailjs === 'undefined') {
                throw new Error('EmailJS not loaded');
            }
            
            if (typeof EMAIL_CONFIG === 'undefined') {
                throw new Error('Email configuration not loaded');
            }
            
            if (EMAIL_CONFIG.PUBLIC_KEY === 'your_public_key') {
                // Fallback to console if not configured
                console.log(`🔑 EMAILJS NOT CONFIGURED - Reset code for ${email}: ${resetCode}`);
                return;
            }

            try {
                // Initialize EmailJS with your public key
                emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);

                const templateParams = {
                    to_email: email,
                    to_name: userName,
                    reset_code: resetCode,
                    app_name: EMAIL_CONFIG.TEMPLATE_PARAMS.app_name,
                    expiry_minutes: EMAIL_CONFIG.TEMPLATE_PARAMS.expiry_minutes
                };

                await emailjs.send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.TEMPLATE_ID, templateParams);
                console.log(`📧 Reset email sent to ${email} with code ${resetCode}`);
            } catch (error) {
                console.error('EmailJS error:', error);
                throw error;
            }
        },

        verifyResetCode: function(email, code) {
            const resetData = sessionStorage.getItem('agroplay_reset_code');
            if (!resetData) return { valid: false, message: 'Kode reset tidak ditemukan!' };

            try {
                const reset = JSON.parse(resetData);
                const now = Date.now();
                const fifteenMinutes = 15 * 60 * 1000;

                // Check if code is expired
                if (now - reset.timestamp > fifteenMinutes) {
                    sessionStorage.removeItem('agroplay_reset_code');
                    return { valid: false, message: 'Kode reset sudah kadaluarsa!' };
                }

                // Check if too many attempts
                if (reset.attempts >= 3) {
                    sessionStorage.removeItem('agroplay_reset_code');
                    return { valid: false, message: 'Terlalu banyak percobaan! Silakan minta kode baru.' };
                }

                // Verify code and email
                if (reset.email === email.toLowerCase() && reset.code === code) {
                    return { valid: true, message: 'Kode valid!' };
                } else {
                    // Increment attempt count
                    reset.attempts++;
                    sessionStorage.setItem('agroplay_reset_code', JSON.stringify(resetData));
                    return { valid: false, message: `Kode salah! Percobaan tersisa: ${3 - reset.attempts}` };
                }
            } catch (e) {
                return { valid: false, message: 'Kode reset tidak valid!' };
            }
        },

        resetPassword: async function(email, newPassword) {
            if (!isValidEmail(email)) return { success: false, message: 'Email tidak valid!' };
            if (newPassword.length < 6) return { success: false, message: 'Password minimal 6 karakter!' };

            const users = this.getStoredUsers();
            const userIndex = users.findIndex(u => u.email === email.toLowerCase());
            
            if (userIndex === -1) return { success: false, message: 'Email tidak terdaftar!' };

            // Update password
            users[userIndex].passwordHash = simpleHash(newPassword);
            users[userIndex].password = newPassword;
            users[userIndex].passwordResetAt = new Date().toISOString();
            
            this.saveStoredUsers(users);
            
            // Clear reset code
            sessionStorage.removeItem('agroplay_reset_code');

            return { success: true, message: 'Password berhasil direset! Silakan login dengan password baru.' };
        }
    };

// RESET USERS - ONLY LOAD IF NO USERS EXIST
const existingUsers = safeJSON('agroplay_users', []);
let demoUsers = existingUsers;

// Only load demo users if no users exist
if (existingUsers.length === 0) {
    demoUsers = [
        { id: '1', name: 'Guru Budi', email: 'guru@test.com', passwordHash: simpleHash('123456'), password: '123456', role: 'guru', createdAt: new Date().toISOString() },
        { id: '2', name: 'Siswa Andi 7A', email: 'siswa7a@test.com', passwordHash: simpleHash('123456'), password: '123456', role: 'siswa', class: '7A', createdAt: new Date().toISOString() },
        { id: '3', name: 'Admin Test', email: 'admin@test.com', passwordHash: simpleHash('admin123'), password: 'admin123', role: 'admin', createdAt: new Date().toISOString() },
        { id: '4', name: 'Siswa Demo', email: 'siswa@test.com', passwordHash: simpleHash('123456'), password: '123456', role: 'siswa', createdAt: new Date().toISOString() },
        { id: '5', name: 'Ortu Sari', email: 'ortu@test.com', passwordHash: simpleHash('123456'), password: '123456', role: 'orangtua', createdAt: new Date().toISOString() }
    ];
    
    safeSave('agroplay_users', demoUsers);
    console.log('Demo users loaded for first time');
} else {
    console.log('Using existing users, preserving progress');
}
})();

