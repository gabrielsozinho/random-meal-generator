const generateButton = document.getElementById('btn-generate');
const loadingSpin = document.getElementsByClassName('loading');
const title = document.getElementsByClassName('title');



generateButton.addEventListener('click', () => {
    generateButton.classList.add('hidden')
    title[0].classList.add('hidden')
    loadingSpin[0].classList.remove('hidden');
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            console.log(meal)
            const mealTitle = meal.strMeal
            const mealInstructions = meal.strInstructions
            const mealImage = meal.strMealThumb
            const mealVideo = meal.strYoutube
            const mealIngredients = []
            for (let i = 1; i <= 20; i++) {
                if (meal[`strIngredient${i}`]) {
                    mealIngredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
                } else {
                    break;
                }
            }
            const mealDiv = document.createElement('div');
            mealDiv.classList.add('meal');
            const mealInfo = `
            <h1>${mealTitle}</h1>
            <img src="${mealImage}" alt="${mealTitle}" align="center">
            <h3>Instructions</h3>
            <p>${mealInstructions}</p>
            <h3>Ingredients</h3>
            <ul>
                ${mealIngredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <h3 class="video">Video Recipe</h3>
            <a href="${mealVideo}" target="_blank">Watch Video</a>
            `
            mealDiv.innerHTML = mealInfo;
            const mealContainer = document.getElementById('meal');
            mealContainer.appendChild(mealDiv);
            loadingSpin[0].classList.add('hidden');
        })
    })