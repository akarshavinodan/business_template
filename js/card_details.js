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