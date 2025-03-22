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




function showDnsInstructions() {
    document.getElementById('domainCard').style.display = 'none';
    document.getElementById('dnsCard').style.display = 'block';
}

function showDomainCard() {
    document.getElementById('dnsCard').style.display = 'none';
    document.getElementById('domainCard').style.display = 'block';
}

function showHostingConfirmation() {
    document.getElementById('dnsCard').style.display = 'none';
    document.getElementById('hostingCard').style.display = 'block';
}

const modal = new bootstrap.Modal(document.getElementById('dnsInstructionsModal'));
modal.show();