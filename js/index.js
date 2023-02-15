	// async function api() {
	// 	await fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(function (response) {
	// 		// The API call was successful!
	// 		console.log(response);
	// 		var data = await response.json();
	// 		document.getElementById('meals').innerHTML = data;
	// 	}).catch(function (err) {
	// 		// There was an error
	// 		console.warn('Something went wrong.', err);
	// 	});
	// }


	// api url
	const api_url = "https://www.themealdb.com/api/json/v1/1/categories.php";

	// Defining async function
	async function getapi(url) {

		// Storing response
		const response = await fetch(url);

		// Storing data in form of JSON
		var data = await response.json();
		//console.log(data);
		var tab = ""
		for (let r of data.categories) {
			tab += `<tr> 
    <td>${r.idCategory} </td>
    <td>${r.strCategory}</td> 
    <td>${r.strCategoryDescription}</td>          
    <td><img src="${r.strCategoryThumb}" width="200"/></td>          
   </tr>`;
		}
		//document.getElementById('meals').innerHTML = tab;


		//console.log(responses);
	}


	// Calling that async function
	//getapi(api_url);




	let searchInput = document.querySelector('#search-input');

	searchInput.addEventListener('keyup', async (e) => {

		// Perform asynchronous operation here
		let searchTerm = searchInput.value;
		//console.log(searchTerm);
		const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchTerm);
		const data = await response.json();
		//console.log(data.meals);
		let searchResults = document.querySelector('#search-results');
		searchResults.innerHTML = '';
		if (data.meals != null) {



			for (let i = 0; i < data.meals.length; i++) {
				const meal = data.meals[i];
				//console.log(meal.strMealThumb[i]);
				searchResults.innerHTML += `
			
			<div class="col-lg-4">
                        <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div><img src="${meal.strMealThumb}" width="200"/></div>
                            <h3>${meal.strArea}</h3>
                            <p class="lead mb-0">${meal.strCategory}</p>
                            <p class="lead mb-0"><button type="button" class="btn btn-primary addfav" onclick="addFave(id)" id="add-Fave-${meal.idMeal}" >Add 
							 Fav</button></p>
                        </div>
                    </div>`;


			}

		} else {
			searchResults.innerHTML += `<div class="col-lg-12">
			<div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
			<div class="features-icons-icon d-flex"><i class="bi-search m-auto text-primary"></i></div>
			</div>
				 <h2>Search Result not found</h2> 
				</div>`;
		}

	});
	const meals = [];
	//const PushData = [];
	var PushData = JSON.parse(localStorage.getItem("meals")) || [];

	function addFave(id) {
		PushData.push(id.replace('add-Fave-', ''));
		localStorage.setItem("meals", JSON.stringify(PushData));
	}

	//console.log(localStorage.getItem("meals"));
	 const idArray = JSON.parse(localStorage.getItem("meals"));
	// console.log(idArray);


	 idArray.forEach(async function (hhs) {
		const url = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + hhs);
		const data = await url.json();
		meals.push(data.meals[0]);
		//console.log(data.meals[0]);
	});
 
	console.log(meals);

	let FavResults = document.querySelector('#fav-results');
	FavResults.innerHTML = '';
	for (let i = 0; i < meals.length; i++) {
		if (meals != null) {
			console.log(meals.length);
			FavResults.innerHTML += `

		<div class="col-lg-4">
					<div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
						<div><img src="${meals[i]['strMealThumb']}" width="200"/></div>
						<h3>${meals[i]['strArea']}</h3>
						<p class="lead mb-0">${meals[i]['strCategory']}</p>
						<p class="lead mb-0"><button type="button" class="btn btn-primary ">Remove 
						 Fav</button></p>
					</div>
				</div>`;
				
	} else {
		FavResults.innerHTML += `<div class="col-lg-12">
		<div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
		<div class="features-icons-icon d-flex"><i class="bi-search m-auto text-primary"></i></div>
		</div>
			 <h2>Search Result not found</h2> 
			</div>`;


	}
		
	}

