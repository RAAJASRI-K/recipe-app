const searchbox=document.querySelector('.search-box');
const searchbtn=document.querySelector('.search-btn');
const recipe=document.querySelector('.recipe-container');
const recipeclosebtn=document.querySelector('.recipe-close-btn');
const recipedetails=document.querySelector('.recipe-details-content');

const fetchRecipes = async (query) =>{
    recipe.innerHTML="<h2>Fetching recipies...</h2>";
    try{
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const response=await data.json();
    // console.log(response);
    recipe.innerHTML="";
    response.meals.forEach(meal =>{
        const recipeDiv=document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=
        `<img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> dish</p>
        <p>Belongs to <span>${meal.strCategory}</span></p>`
        const button=document.createElement('button');
        button.textContent="View Recipe";
        recipeDiv.appendChild(button);
        button.addEventListener('click',()=>{
            openRecipePopup(meal);
        })
        recipe.appendChild(recipeDiv);
    });
    }
    catch(error){
        recipe.innerHTML="<h2>Error in Fetching Recipes...</h2>"
    }

    
}
const openRecipePopup=(meal)=>{
    recipedetails.innerHTML=`<h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="IngredientList">${fetchingIngredients(meal)}</ul>
    <div>
    <h3>Instructions:</h3>
    <p class="instructions">${meal.strInstructions}</p></div>`

    recipedetails.parentElement.style.display="block";
}

const fetchingIngredients=(meal)=>{
    // console.log(meal);
    let ingredientslist="";
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            ingredientslist+=`<li>${measure}${ingredient}</li>`
        }
        else{
            break; 
        }
    }
    return ingredientslist;
}
recipeclosebtn.addEventListener('click',()=>{
    recipedetails.parentElement.style.display="none";
})

searchbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchbox.value.trim();
    if(!searchInput){
        recipe.innerHTML=`<h2>Type the meal in the search box.</h2>`
        return;
    }
    fetchRecipes(searchInput);
});