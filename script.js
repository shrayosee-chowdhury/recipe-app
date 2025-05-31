const recipeListContainer = document.querySelector('.recipe-list');
const loader = document.querySelector('.loader');

async function fetchRecipes(query = '') {
    loader.style.display = 'block';
    recipeListContainer.innerHTML = '';

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        loader.style.display = 'none';

        if (data.meals) {
            displayRecipes(data.meals);
        } else {
            recipeListContainer.innerHTML = '<p>No recipes found.</p>';
        }
    } catch (error) {
        loader.style.display = 'none';
        recipeListContainer.innerHTML = '<p>Error fetching recipes.</p>';
        console.error(error);
    }
}

function displayRecipes(meals) {
    meals.forEach(meal => {
        const recipeItemWrapper = document.createElement('div');
        recipeItemWrapper.classList.add('recipe-item');

        recipeItemWrapper.innerHTML = `
            <img class="recipe-image" src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <p class="recipe-name">${meal.strMeal}</p>
            <p class="recipe-cuisine">${meal.strArea} Cuisine</p>
            <div class="recipe-ingredients"><strong>Category:</strong> ${meal.strCategory}</div>
            <p class="recipe-meal-type">Meal Type: ${meal.strTags || 'N/A'}</p>
            <p class="recipe-rating">Rating: 🌟🌟🌟🌟 (Sample)</p>
            <button class="recipe-details-button" onclick="window.open('${meal.strSource || meal.strYoutube}', '_blank')">Recipe Details</button>
        `;

        recipeListContainer.appendChild(recipeItemWrapper);
    });
}

function searchRecipe() {
    const query = document.getElementById('search-input').value.trim();
    fetchRecipes(query);
}

// Fetch default recipes on load
fetchRecipes();
