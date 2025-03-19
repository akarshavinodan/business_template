(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Client carousel
    $(".client-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 90,
        dots: false,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:3
            },
            768:{
                items:4
            },
            992:{
                items:5
            },
            1200:{
                items:6
            }
        }
    });
    
})(jQuery);


// ---------------------------------------------------------------------------------
document.getElementById("reviewForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get input values
    let fullName = document.getElementById("fullName").value;
    let location = document.getElementById("location").value;
    let reviewText = document.getElementById("reviewText").value;
    
    // Create new review HTML
    let newReview = `
        <div class="review-item mb-3 pb-3 border-bottom">
            <div class="d-flex align-items-center mb-2">
                <img src="img/user.jpg" class="rounded-circle me-2" style="width: 40px; height: 40px;">
                <div>
                    <h6 class="mb-0">${fullName}</h6>
                    <small class="text-muted">${location}</small><br>
                    <small class="text-muted">Just now</small>
                </div>
            </div>
            <p class="mb-0 text-muted">${reviewText}</p>
        </div>`;

    // Append new review to the list
    document.getElementById("review-list").insertAdjacentHTML("beforeend", newReview);

    // Clear form and close modal
    document.getElementById("reviewForm").reset();
    var reviewModal = new bootstrap.Modal(document.getElementById("reviewModal"));
    reviewModal.hide();
});

// ---------------------------------------------------------------------------------------------------------

function generateQR() {
    const url = window.location.href;
    document.getElementById('shareUrl').value = url;
    
    // Clear previous QR code
    document.getElementById('qrcode').innerHTML = '';
    
    // Generate new QR code
    new QRCode(document.getElementById('qrcode'), {
        text: url,
        width: 200,
        height: 200
    });
}

function copyShareUrl() {
    const shareUrl = document.getElementById('shareUrl');
    shareUrl.select();
    document.execCommand('copy');
    
    // Show feedback
    const button = document.querySelector('#shareModal .btn-primary');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
        button.innerHTML = originalText;
    }, 2000);
}

// ------------------------------------------------------------------------------------------------
 
 
//  -----------------------------------------------------------------------------------------------


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


function openEditModal(type) {
    if (type === 'basic') {
        const modal = new bootstrap.Modal(document.getElementById('basicInfoModal'));
        modal.show();
    } else if (type === 'social') {
        const modal = new bootstrap.Modal(document.getElementById('socialMediaModal'));
        modal.show();
    }
}

function saveBasicInfo() {
    // Update basic information in the card
    document.querySelector('.info-item:has(label:contains("Business Name")) p').textContent = document.getElementById('businessName').value;
    document.querySelector('.info-item:has(label:contains("State")) p').textContent = document.getElementById('state').value;
    document.querySelector('.info-item:has(label:contains("City")) p').textContent = document.getElementById('city').value;
    document.querySelector('.info-item:has(label:contains("Address")) p').textContent = document.getElementById('address').value;
    document.querySelector('.info-item:has(label:contains("Mobile")) p').textContent = document.getElementById('mobile').value;
    document.querySelector('.info-item:has(label:contains("About Business")) p').textContent = document.getElementById('about').value;

    const modal = bootstrap.Modal.getInstance(document.getElementById('basicInfoModal'));
    modal.hide();
}

function saveSocialMedia() {
    // Update social media in the card
    document.querySelector('.social-item:has(label:contains("Facebook")) p').textContent = document.getElementById('facebook').value || 'Not Added';
    document.querySelector('.social-item:has(label:contains("Instagram")) p').textContent = document.getElementById('instagram').value || 'Not Added';
    document.querySelector('.social-item:has(label:contains("WhatsApp")) p').textContent = document.getElementById('whatsapp').value || 'Not Added';
    document.querySelector('.social-item:has(label:contains("YouTube")) p').textContent = document.getElementById('youtube').value || 'Not Added';

    const modal = bootstrap.Modal.getInstance(document.getElementById('socialMediaModal'));
    modal.hide();
}