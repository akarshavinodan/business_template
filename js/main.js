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