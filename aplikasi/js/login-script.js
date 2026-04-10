// Login page specific logic
function selectRole(role) {
    selectedRole = role;
    document.querySelectorAll('#register-form .role-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    document.querySelector('#register-form [data-role="' + role + '"]').classList.add('active');
    
    // Show/hide class selector for siswa
    var classGroup = document.getElementById('class-group');
    if (classGroup) {
        if (role === 'siswa') {
            classGroup.style.display = 'block';
        } else {
            classGroup.style.display = 'none';
            document.getElementById('register-class').value = '';
        }
    }
}

function handleRegister(event) {
    event.preventDefault();
    hideAlert();
    
    var name = document.getElementById('register-name').value.trim();
    var email = document.getElementById('register-email').value.trim();
    var password = document.getElementById('register-password').value;
    var cls = document.getElementById('register-class') ? document.getElementById('register-class').value.trim().toUpperCase() : '';
    var btn = document.getElementById('register-btn');
    
    if (!name || !email || !password) {
        showAlert('Mohon isi semua data!', 'error');
        return false;
    }
    
    if (password.length < 6) {
        showAlert('Password minimal 6 karakter!', 'error');
        return false;
    }
    
    if (selectedRole === 'siswa' && !cls) {
        showAlert('Mohon isi kelas untuk siswa!', 'error');
        return false;
    }
    
    console.log('📝 Registering with role:', selectedRole, 'class:', cls);
    
    btn.classList.add('loading');
    btn.disabled = true;
    
    setTimeout(function() {
        var result = AUTH.register(name, email, password, selectedRole, cls);
        
        console.log('✅ Register result:', result);
        
        if (result.success) {
            showAlert('✅ Pendaftaran berhasil! Silakan login dengan akun baru Anda.', 'success');
            
            // Clear the form
            document.getElementById('register-form').reset();
            
            // Switch to login tab
            setTimeout(function() {
                switchTab('login');
                document.getElementById('login-email').value = email;
                btn.classList.remove('loading');
                btn.disabled = false;
            }, 1000);
        } else {
            showAlert(result.message, 'error');
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    }, 800);
    
    return false;
}
