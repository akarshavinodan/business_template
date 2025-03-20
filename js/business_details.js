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



// -----------------------------------------------------------------------------------------------------------


function openEditModal(type) {
    const modal = new bootstrap.Modal(document.getElementById('editModal'));
    // Load appropriate form based on type
    modal.show();
}

function saveChanges() {
    // Handle save logic
    const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    modal.hide();
}


// Add these functions to main.js
function openEditModal(type) {
    if (type === 'basic') {
        const modal = new bootstrap.Modal(document.getElementById('basicInfoModal'));
        modal.show();
    } else if (type === 'social') {
        const modal = new bootstrap.Modal(document.getElementById('socialMediaModal'));
        modal.show();
    } else if (type === 'gallery') {
        const modal = new bootstrap.Modal(document.getElementById('galleryModal'));
        loadGalleryPreview();
        modal.show();
    }else if (type === 'hours') {
        const modal = new bootstrap.Modal(document.getElementById('hoursModal'));
        modal.show();
    }else if (type === 'meta') {
        const modal = new bootstrap.Modal(document.getElementById('metaModal'));
        modal.show();
    }
}

function handleGalleryUpload(event) {
    const files = event.target.files;
    const galleryPreview = document.getElementById('galleryPreview');
    galleryPreview.innerHTML = '';

    Array.from(files).forEach((file, index) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const col = document.createElement('div');
                col.className = 'col-md-4 col-sm-6';
                col.innerHTML = `
                    <div class="gallery-preview-item">
                        <img src="${e.target.result}" class="img-fluid" alt="Gallery Preview">
                        <button type="button" class="btn btn-danger btn-sm remove-image" onclick="removePreviewImage(${index})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                `;
                galleryPreview.appendChild(col);
            };
            reader.readAsDataURL(file);
        }
    });
}

function removePreviewImage(index) {
    const previewItems = document.querySelectorAll('#galleryPreview .col-md-4');
    if (previewItems[index]) {
        previewItems[index].remove();
    }
}

function loadGalleryPreview() {
    const galleryPreview = document.getElementById('galleryPreview');
    const currentImages = document.querySelectorAll('#galleryContainer img');
    galleryPreview.innerHTML = '';

    currentImages.forEach((img, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-4 col-sm-6';
        col.innerHTML = `
            <div class="gallery-preview-item">
                <img src="${img.src}" class="img-fluid" alt="Gallery Preview">
                <button type="button" class="btn btn-danger btn-sm remove-image" onclick="removePreviewImage(${index})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;
        galleryPreview.appendChild(col);
    });
}

function saveGallery() {
    const galleryContainer = document.getElementById('galleryContainer');
    const previewImages = document.querySelectorAll('#galleryPreview img');
    
    galleryContainer.innerHTML = '';
    previewImages.forEach(img => {
        const col = document.createElement('div');
        col.className = 'col-md-4 col-sm-6';
        col.innerHTML = `
            <div class="gallery-item">
                <img src="${img.src}" alt="Business Image" class="img-fluid">
            </div>
        `;
        galleryContainer.appendChild(col);
    });

    const modal = bootstrap.Modal.getInstance(document.getElementById('galleryModal'));
    modal.hide();
}

// Keep your existing functions for basic info and social media...
function previewLogo(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('logoPreview').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function saveBasicInfo() {
    // Get all form values
    const businessName = document.getElementById('businessName').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    const address = document.getElementById('address').value;
    const mobile = document.getElementById('mobile').value;
    const about = document.getElementById('about').value;
    const services = document.getElementById('services').value;
    const deals = document.getElementById('deals').value;
    const logoFile = document.getElementById('logoInput').files[0];

    // Update the displayed information
    document.querySelector('.info-item p').textContent = businessName;
    document.querySelectorAll('.info-item').forEach(item => {
        const label = item.querySelector('label').textContent.toLowerCase();
        const p = item.querySelector('p');
        
        if (label.includes('business name')) p.textContent = businessName;
        if (label.includes('state')) p.textContent = state;
        if (label.includes('city')) p.textContent = city;
        if (label.includes('address')) p.textContent = address;
        if (label.includes('mobile')) p.textContent = mobile;
        if (label.includes('about business')) p.textContent = about;
        if (label.includes('services offered')) p.textContent = services;
        if (label.includes('deals')) p.textContent = deals;
    });

    // Update logo if a new one was uploaded
    if (logoFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('businessLogo').src = e.target.result;
        };
        reader.readAsDataURL(logoFile);
    }

    // Close the modal
    const basicInfoModal = document.getElementById('basicInfoModal');
    const modal = bootstrap.Modal.getInstance(basicInfoModal);
    if (modal) {
        modal.hide();
    }
}

function saveSocialMedia() {
    // Get form values
    const facebook = document.getElementById('facebook').value;
    const instagram = document.getElementById('instagram').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const youtube = document.getElementById('youtube').value;

    // Update social media items in the card
    const socialItems = document.querySelectorAll('.social-item');
    socialItems.forEach(item => {
        const label = item.querySelector('label').textContent.toLowerCase();
        const p = item.querySelector('p');
        
        if (label.includes('facebook')) {
            p.textContent = facebook || 'Not Added';
        } else if (label.includes('instagram')) {
            p.textContent = instagram || 'Not Added';
        } else if (label.includes('whatsapp')) {
            p.textContent = whatsapp || 'Not Added';
        } else if (label.includes('youtube')) {
            p.textContent = youtube || 'Not Added';
        }
    });

    // Close the modal
    const socialMediaModal = document.getElementById('socialMediaModal');
    const modal = bootstrap.Modal.getInstance(socialMediaModal);
    if (modal) {
        modal.hide();
    }
}


function saveBusinessHours() {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const container = document.getElementById('businessHoursContainer');
    let html = '<div class="row">';
    
    // First column (Sunday to Wednesday)
    html += '<div class="col-md-6">';
    days.slice(0, 4).forEach(day => {
        const status = document.getElementById(`${day}-status`).value;
        const fromTime = document.getElementById(`${day}-from`).value;
        const toTime = document.getElementById(`${day}-to`).value;

        html += `
            <div class="hours-item">
                <span class="day">${day.charAt(0).toUpperCase() + day.slice(1)}</span>
                ${status === 'closed' 
                    ? '<span class="status text-danger">Closed</span>'
                    : `<span class="time text-success">${formatTime(fromTime)} - ${formatTime(toTime)}</span>`}
            </div>`;
    });
    html += '</div>';

    // Second column (Thursday to Saturday)
    html += '<div class="col-md-6">';
    days.slice(4).forEach(day => {
        const status = document.getElementById(`${day}-status`).value;
        const fromTime = document.getElementById(`${day}-from`).value;
        const toTime = document.getElementById(`${day}-to`).value;

        html += `
            <div class="hours-item">
                <span class="day">${day.charAt(0).toUpperCase() + day.slice(1)}</span>
                ${status === 'closed' 
                    ? '<span class="status text-danger">Closed</span>'
                    : `<span class="time text-success">${formatTime(fromTime)} - ${formatTime(toTime)}</span>`}
            </div>`;
    });
    html += '</div></div>';

    // Update the container and close modal
    container.innerHTML = html;
    
    const hoursModal = document.getElementById('hoursModal');
    const modal = bootstrap.Modal.getInstance(hoursModal);
    if (modal) {
        modal.hide();
    }
}

function toggleTimeInputs(day) {
    const status = document.getElementById(`${day}-status`).value;
    const fromInput = document.getElementById(`${day}-from`);
    const toInput = document.getElementById(`${day}-to`);
    
    fromInput.disabled = status === 'closed';
    toInput.disabled = status === 'closed';
}

function formatTime(timeString) {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const time = new Date();
    time.setHours(parseInt(hours), parseInt(minutes));
    return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}


function saveMetaInfo() {
    const keywords = document.getElementById('metaKeywords').value;
    const description = document.getElementById('metaDescription').value;
    
    const container = document.getElementById('metaContainer');
    container.innerHTML = `
        <div class="info-item">
            <label>Meta Keywords</label>
            <p>${keywords}</p>
        </div>
        <div class="info-item">
            <label>Meta Description</label>
            <p>${description}</p>
        </div>
    `;

    const modal = bootstrap.Modal.getInstance(document.getElementById('metaModal'));
    modal.hide();
}