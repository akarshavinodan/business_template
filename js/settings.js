// Sidebar Toggle
 const sidebar = document.getElementById('sidebar');
 const mainContent = document.getElementById('main-content');
 const toggleBtn = document.getElementById('toggle-btn');

 toggleBtn.addEventListener('click', () => {
     if (window.innerWidth <= 991.98) {
         sidebar.classList.toggle('expanded');
     } else {
         sidebar.classList.toggle('collapsed');
         mainContent.classList.toggle('expanded');
     }
 });

 // Close sidebar on window resize
 window.addEventListener('resize', () => {
     if (window.innerWidth > 991.98) {
         sidebar.classList.remove('expanded');
     }
 });

 function showEditForm() {
    // Populate edit form with current values
    document.getElementById('editBusinessName').value = document.getElementById('viewBusinessName').textContent;
    document.getElementById('editFullName').value = document.getElementById('viewFullName').textContent;
    document.getElementById('editEmail').value = document.getElementById('viewEmail').textContent;
    document.getElementById('editPhone').value = document.getElementById('viewPhone').textContent;
    
    // Pre-fill Current Password
    document.getElementById('currentPassword').value = "123456789"; 

    // Show edit form, hide view card
    document.getElementById('profileViewCard').style.display = 'none';
    document.getElementById('editFormCard').style.display = 'block';
}

// Toggle visibility of password in Profile Details
function toggleProfilePassword() {
    const passwordSpan = document.getElementById('viewPassword');
    const icon = passwordSpan.nextElementSibling;

    if (passwordSpan.textContent === "*********") {
        passwordSpan.textContent = "123456789";  // Show password
        icon.classList.replace('bi-eye-slash', 'bi-eye');
    } else {
        passwordSpan.textContent = "*********";  // Hide password
        icon.classList.replace('bi-eye', 'bi-eye-slash');
    }
}


 function cancelEdit() {
     // Clear form and errors
     document.getElementById('editProfileForm').reset();
     document.getElementById('passwordError').style.display = 'none';

     // Show view card, hide edit form
     document.getElementById('profileViewCard').style.display = 'block';
     document.getElementById('editFormCard').style.display = 'none';
 }

 function togglePassword(inputId) {
     const input = document.getElementById(inputId);
     const icon = input.nextElementSibling;
     
     if (input.type === 'password') {
         input.type = 'text';
         icon.classList.replace('bi-eye-slash', 'bi-eye');
     } else {
         input.type = 'password';
         icon.classList.replace('bi-eye', 'bi-eye-slash');
     }
 }

 function saveChanges(event) {
     event.preventDefault();
     
     const newPassword = document.getElementById('newPassword').value;
     const confirmPassword = document.getElementById('confirmPassword').value;
     const errorDiv = document.getElementById('passwordError');

     // Password validation
     if (newPassword || confirmPassword) {
         if (newPassword !== confirmPassword) {
             errorDiv.textContent = "New passwords don't match!";
             errorDiv.style.display = 'block';
             return;
         }
         if (newPassword.length < 6) {
             errorDiv.textContent = "Password must be at least 6 characters long!";
             errorDiv.style.display = 'block';
             return;
         }
     }

     // Update profile view with new values
     document.getElementById('viewBusinessName').textContent = document.getElementById('editBusinessName').value;
     document.getElementById('viewFullName').textContent = document.getElementById('editFullName').value;
     document.getElementById('viewEmail').textContent = document.getElementById('editEmail').value;
     document.getElementById('viewPhone').textContent = document.getElementById('editPhone').value;

     // Show success message
     const successAlert = document.createElement('div');
     successAlert.className = 'alert alert-success';
     successAlert.textContent = 'Profile updated successfully!';
     document.querySelector('.settings-container').insertBefore(successAlert, document.querySelector('.profile-view-card'));

     // Hide success message after 3 seconds
     setTimeout(() => {
         successAlert.remove();
     }, 3000);

     // Return to view mode
     cancelEdit();
 }