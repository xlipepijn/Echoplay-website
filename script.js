import getDates from './webscraper'

const mobileToggle = document.querySelector('[data-mobile-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const allLinks = [...document.querySelectorAll('a')];
const allModalButtons = [...document.querySelectorAll('button[data-open-modal]')]
const allModals = [...document.querySelectorAll('[data-modal]')]
const bodySection = document.querySelector('body')
const showPastGigsButton = document.querySelector("[data-toggle-gigs-shown]");
const hidePastGigsButton = document.querySelector(
  "[data-toggle-gigs-shown-hide]"
);
const pastGigsContainer = document.querySelector("[data-past-gigs]")

function closeModal(currentModal) {
    console.log(currentModal)
    currentModal.close()
    bodySection.dataset.modalState = "closed";
}

function openModal(triggeredModalId) {
    let triggeredModal = allModals.find((modal) => modal.dataset.modal == triggeredModalId);
    if (!triggeredModal) return (
        console.log('nothing found :(', {triggeredModalId} )
    )
    bodySection.dataset.modalState = 'opened'
    triggeredModal.show();
}

allModalButtons?.forEach((modalButton) =>{
    modalButton.addEventListener('click',(e) => openModal(e.currentTarget.dataset.openModal))
})

allModals?.forEach((modal) => {
    let currentCloseBtn = modal.querySelector('[data-close-modal]')
    if(!currentCloseBtn) return console.log("no close btn found :(" , {modal})
    currentCloseBtn.addEventListener("click", () => closeModal(modal));
})


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
allLinks.forEach((link) => {
    link.addEventListener('click',() => {
        mobileMenu.dataset.mobileMenu = "closed";
    })
})

function hidePastGigs() {
    pastGigsContainer.style.display = 'none';
    hidePastGigsButton.style.display = 'none';
    showPastGigsButton.style.display = 'flex';
}

function showPastGigs() {
  pastGigsContainer.style.display = "block";
  hidePastGigsButton.style.display = "flex";
  showPastGigsButton.style.display = "none";
}

showPastGigsButton.addEventListener('click', showPastGigs)
hidePastGigsButton.addEventListener("click", hidePastGigs);