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

//   ---------------------------------------------------------------------------------------------------

function openAddDealModal() {
    const modal = new bootstrap.Modal(document.getElementById('addDealModal'));
    resetForm();
    modal.show();
}

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('dealPreview');
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

function resetForm() {
    document.getElementById('addDealForm').reset();
    const preview = document.getElementById('dealPreview');
    preview.src = '';
    preview.style.display = 'none';
}

function submitDeal() {
    const form = document.getElementById('addDealForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const deal = document.getElementById('deal').value;
    const image = document.getElementById('dealImage').files[0];
    const validity = document.getElementById('dealValidity').value;
    const couponCode = document.getElementById('couponCode').value;
    const description = document.getElementById('dealDescription').value;

    const dealsContainer = document.getElementById('dealsContainer');
    const dealCard = createDealCard({
        deal,
        image: URL.createObjectURL(image),
        validity,
        couponCode,
        description
    });
    
    dealsContainer.appendChild(dealCard);
    const modal = bootstrap.Modal.getInstance(document.getElementById('addDealModal'));
    modal.hide();
    resetForm();
}

function createDealCard(deal) {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-sm-6';
    col.innerHTML = `
        <div class="deal-card">
            <img src="${deal.image}" class="deal-image" alt="Deal">
            <div class="deal-content">
                <div class="deal-validity">Valid until: ${formatDate(deal.validity)}</div>
                <div class="coupon-code">${deal.couponCode}</div>
                <p>${deal.description}</p>
            </div>
        </div>
    `;
    return col;
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
}