const mobileToggle = document.querySelector('[data-mobile-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

function toggleMobileMenu() {
    if(mobileMenu.dataset.mobileMenu == 'closed') {
        mobileMenu.dataset.mobileMenu = 'open';
    } else {
        mobileMenu.dataset.mobileMenu = 'closed';
    }
}

var flkty = new Flickity( '[data-slider]', {
    // options
    cellAlign: 'center',
    contain: true,
  });


mobileToggle?.addEventListener('click', toggleMobileMenu);