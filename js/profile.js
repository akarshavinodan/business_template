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
