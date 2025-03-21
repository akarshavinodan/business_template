function openEditModal() {
    const modal = new bootstrap.Modal(document.getElementById('editBusinessModal'));
    modal.show();
}

function saveBusinessDetails() {
    // Update basic info
    document.getElementById('viewBusinessName').textContent = document.getElementById('businessName').value || 'Not Added';
    document.getElementById('viewCategory').textContent = document.getElementById('category').value || 'Not Added';
    document.getElementById('viewLocation').textContent = 
        `${document.getElementById('address').value}, ${document.getElementById('city').value}, ${document.getElementById('state').value}` || 'Not Added';
    document.getElementById('viewMobile').textContent = document.getElementById('mobile').value || 'Not Added';
    document.getElementById('viewEmail').textContent = document.getElementById('email').value || 'Not Added';
    document.getElementById('viewComment').textContent = document.getElementById('comment').value || 'Not Added';

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editBusinessModal'));
    if (modal) {
        modal.hide();
    }
}

// Add gallery preview functionality
document.getElementById('gallery').addEventListener('change', function(event) {
    const galleryPreview = document.getElementById('galleryPreview');
    galleryPreview.innerHTML = '';
    
    Array.from(event.target.files).forEach((file, index) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const col = document.createElement('div');
                col.className = 'col-md-4';
                col.innerHTML = `
                    <img src="${e.target.result}" alt="Gallery Preview" class="img-fluid">
                `;
                galleryPreview.appendChild(col);
            };
            reader.readAsDataURL(file);
        }
    });
});