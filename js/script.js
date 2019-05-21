
//----------------------------------------------
// DECLARING GLOBAL VARIABLES
//----------------------------------------------

const galleryList = document.getElementById('gallery');
const modalList = document.querySelector('.modal-container');
const staffUrl = 'https://randomuser.me/api/?results=12&nat=us';
let profiles = [];



//----------------------------------------------
// FETCH REQUEST FUNCTION
//----------------------------------------------

function fetchData(url) {
  return fetch(url)
          .then(res => res.json());
}



//----------------------------------------------
// GENERATE HTML FUNCTION
//----------------------------------------------

/*
Generates 12 staff profile cards pulled in from
  the api using the fetchData function. Each array
  and it's objects are appended to gallery DIV
  with the below HTML formatting. They are also
  pushed to an empty array called profiles which
  is also used in the modal function.
*/

function generateHTML(data) {
	data.map(profile => {
		const div = document.createElement('div');
		galleryList.appendChild(div);
		div.innerHTML +=
		`<div class="card">
				<div class="card-img-container">
						<img class="card-img" src=${profile.picture.medium} alt="profile picture">
				</div>
				<div class="card-info-container">
						<h3 id="name" class="card-name cap">${profile.name.first} ${profile.name.last}</h3>
						<p class="card-text">${profile.email}</p>
						<p class="card-text cap">${profile.location.city}</p>
				</div>
		</div>
		`;
		profiles.push(profile);
	})
	return(data);
}



//----------------------------------------------
// EVENT LISTENER & MODAL FUNCTION
//----------------------------------------------


/* Click handler function. Targets div elements with the class of 'card'. It iterates over
    them and places click event listeners on them and tracks their index value. It then calls the
    generateModal function on click and passes in data and i as arguments.
*/

function clickHandler(data) {
  let employees = document.querySelectorAll('.card');
  employees.forEach((card, i) => {
    card.addEventListener('click', (e) => {
      generateModal(data, i);
    });
  });
}



/* Generate Modal function. Takes data and index value argments passed in by the
    clickHandler function. It appends the contant to the gallery div using the html
    formatting below. The temlate literals are displaying a modal card, pulling in
    data & index value from the profiles array on click. I used += on the modal.innerHTML
    so that it wouldn't remove generateHTML data. I also used the .substring method to
    shorten the dob value returned by the api down to the first 10 values. The event
    listener that closes the modal window is included in this function.
*/

function generateModal(data, i) {
      const modal = document.createElement('div');
      galleryList.appendChild(modal);
      modal.innerHTML +=
      `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${profiles[i].picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${profiles[i].name.first} ${profiles[i].name.last}</h3>
                <p class="modal-text">${profiles[i].email}</p>
                <p class="modal-text cap">${profiles[i].location.city}</p>
                <hr>
                <p class="modal-text">${profiles[i].phone}</p>
                <p class="modal-text cap">${profiles[i].location.street} ${profiles[i].location.city}, ${profiles[i].location.state} ${profiles[i].location.postcode}</p>
                <p class="modal-text">Birthday: ${profiles[i].dob.date.substring(0,10)}</p>
            </div>
        </div>
      </div>
      `;

      /* Closes modal window on click. Targets the button, adds an event listener
          to the button and removes the modal div on click using .remove().
      */
      let button = document.querySelector('#modal-close-btn');
      button.addEventListener('click', (e) => {
        modal.remove();
      })
  }


//----------------------------------------------
// FETCH DATA FUNCTION CALL
//----------------------------------------------

/* Call the fetchData function. Passed in the url from the api. I then use
  .then to pass in the data & results on my generateHTML function. I also pass
  in the clickHandler function.
*/

fetchData(staffUrl)
  .then(data => generateHTML(data.results))
  .then(clickHandler);
