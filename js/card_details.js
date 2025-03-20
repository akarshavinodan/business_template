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
    }else if (type === 'cardContact') {
        const modal = new bootstrap.Modal(document.getElementById('cardContactModal'));
        modal.show();
    }else if (type === 'cardGallery') {
        const modal = new bootstrap.Modal(document.getElementById('cardGalleryModal'));
        loadGalleryPreview();
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
    // Get form values
    const imagePreview = document.getElementById('imagePreview').src;
    const name = document.getElementById('cardName').value;
    const designation = document.getElementById('cardDesignation').value;
    const about = document.getElementById('cardAbout').value;

    // Update card image if changed
    if (imagePreview && !imagePreview.includes('undefined')) {
        document.querySelector('#cardImageContainer img').src = imagePreview;
    }

    // Update text content using proper selectors
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        const label = item.querySelector('label').textContent.toLowerCase();
        const p = item.querySelector('p');
        
        if (label.includes('name')) {
            p.textContent = name;
        } else if (label.includes('designation')) {
            p.textContent = designation;
        } else if (label.includes('about')) {
            p.textContent = about;
        }
    });

    // Close modal properly
    const cardBasicModal = document.getElementById('cardBasicModal');
    const modal = bootstrap.Modal.getInstance(cardBasicModal);
    if (modal) {
        modal.hide();
    }
}


function saveCardContact() {
    const fields = ['phoneNumber', 'email', 'website', 'facebook', 'whatsapp', 'instagram', 'twitter'];
    
    fields.forEach(field => {
        const value = document.getElementById(field).value;
        const displayValue = value || 'Not Added';
        const contactItem = document.querySelector(`.contact-item:has(label:contains("${field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}")) p`);
        if (contactItem) {
            contactItem.textContent = displayValue;
        }
    });

    const modal = bootstrap.Modal.getInstance(document.getElementById('cardContactModal'));
    modal.hide();
}


function handleGalleryUpload(event) {
    const files = event.target.files;
    const galleryPreview = document.getElementById('galleryPreview');
    
    Array.from(files).forEach((file, index) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const col = document.createElement('div');
                col.className = 'col-md-4 col-sm-6';
                col.innerHTML = `
                    <div class="preview-item">
                        <img src="${e.target.result}" alt="Gallery Preview">
                        <div class="remove-btn" onclick="removePreviewImage(${index})">
                            <i class="bi bi-x-lg"></i>
                        </div>
                    </div>
                `;
                galleryPreview.appendChild(col);
            };
            reader.readAsDataURL(file);
        }
    });
}

function loadGalleryPreview() {
    const galleryPreview = document.getElementById('galleryPreview');
    const currentImages = document.querySelectorAll('#cardGalleryContainer img');
    galleryPreview.innerHTML = '';

    currentImages.forEach((img, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-4 col-sm-6';
        col.innerHTML = `
            <div class="preview-item">
                <img src="${img.src}" alt="Gallery Preview">
                <div class="remove-btn" onclick="removePreviewImage(${index})">
                    <i class="bi bi-x-lg"></i>
                </div>
            </div>
        `;
        galleryPreview.appendChild(col);
    });
}

function removePreviewImage(index) {
    const previewItems = document.querySelectorAll('#galleryPreview .col-md-4');
    if (previewItems[index]) {
        previewItems[index].remove();
    }
}

function saveCardGallery() {
    const galleryContainer = document.getElementById('cardGalleryContainer');
    const previewImages = document.querySelectorAll('#galleryPreview img');
    
    galleryContainer.innerHTML = '';
    previewImages.forEach(img => {
        const col = document.createElement('div');
        col.className = 'col-md-4 col-sm-6';
        col.innerHTML = `
            <div class="gallery-card">
                <img src="${img.src}" alt="Gallery Image" class="img-fluid">
            </div>
        `;
        galleryContainer.appendChild(col);
    });

    const modal = bootstrap.Modal.getInstance(document.getElementById('cardGalleryModal'));
    modal.hide();
}