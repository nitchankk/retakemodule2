// import { createGuestList } from './data/guestdata.js'
const createGuestList = require('./data/guestdata.js');

const guestList = createGuestList();
function guestForm() {
  //provide initial guests data list created from GuestManagement class
  let guests = guestList;

  // 1. register event for searching and adding
  function registerEventHandling() {
    const searchInputEl = document.getElementById('search-input');
    const addGuestBtnEl = document.getElementById('add-guest-btn');

    if (!searchInputEl || !addGuestBtnEl) return;

    searchInputEl.addEventListener('keyup', searchGuest);
    addGuestBtnEl.addEventListener('click', addGuest);
  }

  // 2. Function to display one guest in the display area
  function displayGuest(guestItem) {
    const displayAreaEl = document.getElementById('display-area');
    if (!displayAreaEl) return;

    const fNameInputEl = document.getElementById('firstname-input');
    const lNameInputEl = document.getElementById('lastname-input');
    if (!fNameInputEl || !lNameInputEl) return;

    const divEl = document.createElement('div');
    const spanEl1st = document.createElement('span');
    const spanEl2nd = document.createElement('span');

    spanEl1st.textContent = `${guestItem.firstname} ${guestItem.lastname}`;
    spanEl2nd.textContent = '[X]';
    spanEl2nd.setAttribute('class', 'remove-icon');
    spanEl2nd.setAttribute(
      'id',
      `${guestItem.firstname}-${guestItem.lastname}`,
    );
    spanEl2nd.style = 'cursor:pointer;color:red';

    spanEl2nd.addEventListener('click', removeGuest);

    divEl.appendChild(spanEl1st);
    divEl.appendChild(spanEl2nd);

    displayAreaEl.appendChild(divEl);
  }

  // 3. Function to display all existing guests in the display area
  function displayGuests(guestResult) {
    const displayAreaEl = document.getElementById('display-area');
    if (!displayAreaEl) return;

    displayAreaEl.innerHTML = '';

    guestResult.forEach((guestItem) => displayGuest(guestItem));
  }

  // 4. Function to search and display matching guests
  function searchGuest(event) {
    const { value } = event.target;
    const guestResult = guests.searchGuests(value);
    displayGuests(guestResult);
  }

  // 5. Function to add a new guest
  function addGuest() {
    const fNameInputEl = document.getElementById('firstname-input');
    const lNameInputEl = document.getElementById('lastname-input');
    if (!fNameInputEl || !lNameInputEl) return;

    const firstname = fNameInputEl.value;
    const lastname = lNameInputEl.value;

    guests.addNewGuest(firstname, lastname);
    displayGuest({ firstname, lastname });

    fNameInputEl.value = '';
    lNameInputEl.value = '';
  }

  // 6. Function to remove a guest
  function removeGuest(event) {
    const el = event.target;
    if (!el) return;

    const idValue = el.getAttribute('id');
    if (!idValue) return;
    const [fName, lName] = idValue.split('-');

    const deleteGuest = {
      firstname: fName,
      lastname: lName,
    };

    guests.removeGuest(deleteGuest);
    displayGuests(guests.getAllGuests());
  }

  return {
    registerEventHandling,
    displayGuests,
    searchGuest,
    addGuest,
    removeGuest,
  };
}
module.exports = guestForm;
// export { guestForm }
// const { registerEventHandling, displayGuests } = guestForm()
// registerEventHandling()
// displayGuests(guestList.getAllGuests())
