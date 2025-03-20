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
    // Update active state of cards
    document.querySelectorAll('.enquiry-card').forEach(card => {
        card.classList.remove('active');
    });
    event.currentTarget.classList.add('active');

    const enquiriesContainer = document.getElementById('enquiriesContainer');
    const title = type === 'business' ? 'Business' : 'Card';
    
    // Example data - replace with actual data
    const enquiries = []; // Your enquiries data would go here
    
    let content = `
        <h4 class="enquiries-title">Enquiries from ${title}</h4>
    `;
    
    if (enquiries.length === 0) {
        content += `
            <div class="no-enquiries">
                <i class="bi bi-inbox"></i>
                <h4>No enquiries yet</h4>
                <p>When you receive enquiries, they will appear here.</p>
            </div>
        `;
    } else {
        content += enquiries.map(enquiry => `
            <div class="enquiry-item">
                <h5>${enquiry.title}</h5>
                <p>${enquiry.message}</p>
                <small class="text-muted">${enquiry.date}</small>
            </div>
        `).join('');
    }
    
    enquiriesContainer.innerHTML = content;
}