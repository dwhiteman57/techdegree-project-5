
//----------------------------------------------
// DECLARING GLOBAL VARIABLES
//----------------------------------------------
const galleryList = document.getElementById('gallery');
const modalList = document.querySelector('.modal-container');
const userUrl = 'https://randomuser.me/api/?results=12&nat=us';
let profiles = [];
let modals = [];


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

function generateHTML(data) {
	data.map(profile => {
		const div = document.createElement('div');
		galleryList.appendChild(div);
		div.innerHTML =
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
		//profiles.push(profile);
	})
	return(data);
}


//----------------------------------------------
// MODAL FUNCTION
//----------------------------------------------



function generateModal(data) {

    data.map(modal => {
      const body = document.querySelector('body');
      body.classList.add("modal-container");
      body.innerHTML =
      `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${modal.picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${modal.name.first} ${modal.name.last}</h3>
                <p class="modal-text">${modal.email}</p>
                <p class="modal-text cap">${modal.location.city}</p>
                <hr>
                <p class="modal-text">${modal.phone}</p>
                <p class="modal-text cap">${modal.location.street} ${modal.location.city}, ${modal.location.state} ${modal.location.postcode}</p>
                <p class="modal-text">Birthday: ${modal.dob.date}</p>
            </div>
        </div>
      </div>
      `;
    })
  	return(data);
  }





//----------------------------------------------
// FETCH DATA FUNCTION CALL
//----------------------------------------------

fetchData(userUrl)
  .then(data => generateHTML(data.results))
  .then(data => generateModal(data.results))







//----------------------------------------------------------
// EVENT LISTENERS (NOT FUNCTIONAL, JUST TESTING IDEAS)
//----------------------------------------------------------


// let close = document.getElementById("modal-close-btn");
// let card = document.querySelector(".modal");
//
// close.onclick = function() {
//   card.style.display = "none";
//   modalList.hidden=true;
// }
