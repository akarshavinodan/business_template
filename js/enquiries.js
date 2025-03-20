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

// Enquiries Functions
function showEnquiries(type) {
    const modal = new bootstrap.Modal(document.getElementById('enquiriesModal'));
    const modalTitle = document.getElementById('modalTitle');
    const enquiriesList = document.getElementById('enquiriesList');
    
    modalTitle.textContent = `Enquiries from ${type === 'business' ? 'Business' : 'Card'}`;
    
    // Example data - replace with actual data
    const enquiries = []; // Your enquiries data would go here
    
    if (enquiries.length === 0) {
        enquiriesList.innerHTML = `
            <div class="no-enquiries">
                <i class="bi bi-inbox"></i>
                <h4>No enquiries yet</h4>
                <p>When you receive enquiries, they will appear here.</p>
            </div>
        `;
    } else {
        enquiriesList.innerHTML = enquiries.map(enquiry => `
            <div class="enquiry-item">
                <h5>${enquiry.title}</h5>
                <p>${enquiry.message}</p>
                <small class="text-muted">${enquiry.date}</small>
            </div>
        `).join('');
    }
    
    modal.show();
}