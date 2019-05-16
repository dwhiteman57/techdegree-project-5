
//----------------------------------------------
// DECLARING GLOBAL VARIABLES
//----------------------------------------------

const galleryList = document.getElementById('gallery');
const modalList = document.querySelector('.modal-container');
const userUrl = 'https://randomuser.me/api/?results=12&nat=us';
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
		profiles.push(profile);
	})
	return(data);
}




//----------------------------------------------
// MODAL FUNCTION & EVENT LISTENER
//----------------------------------------------

galleryList.addEventListener('click', (e) => {
  const element = e.target.closest('.card');
    if(element != null) {
        generateModal(profiles);
    }
})




function generateModal(data, i) {

      const body = document.querySelector('body');
      body.classList.add("modal-container");
      body.innerHTML =
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
                <p class="modal-text">Birthday: ${profiles[i].dob.date}</p>
            </div>
        </div>
      </div>
      `;
      return(data);






  }





//----------------------------------------------
// FETCH DATA FUNCTION CALL
//----------------------------------------------

fetchData(userUrl)
  .then(data => generateHTML(data.results))
