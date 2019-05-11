
//----------------------------------------------
// DECLARING GLOBAL VARIABLES
//----------------------------------------------
const galleryList = document.getElementById('gallery');
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
// GENERATE HTML
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
// FETCH DATA FUNCTION CALL
//----------------------------------------------

fetchData(userUrl)
  .then(data => generateHTML(data.results))
