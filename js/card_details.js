// Sidebar Toggle Functionality
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

// Modal Functions
function openEditModal(type) {
    if (type === 'cardBasic') {
        const modal = new bootstrap.Modal(document.getElementById('cardBasicModal'));
        modal.show();
    }
}

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imagePreview').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function saveCardBasic() {
    // Update card image
    const imagePreview = document.getElementById('imagePreview').src;
    document.querySelector('#cardImageContainer img').src = imagePreview;

    // Update text content
    const name = document.getElementById('cardName').value;
    const designation = document.getElementById('cardDesignation').value;
    const about = document.getElementById('cardAbout').value;

    document.querySelector('.info-item:has(label:contains("Name")) p').textContent = name;
    document.querySelector('.info-item:has(label:contains("Designation")) p').textContent = designation;
    document.querySelector('.info-item:has(label:contains("About")) p').textContent = about;

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('cardBasicModal'));
    modal.hide();
}