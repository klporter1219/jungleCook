function loadRecipes() {
    if (!_db) {
        return setTimeout(loadRecipes, 100);
    }

    _db
    .collection("Recipes")
    .where("userId", "==", _user.uid)
    .get()
    .then((qs) => {
        const recipes = [];

        $('#recipe-list').html("");

        qs.forEach((doc) => {
            recipes.push({ id: doc.id, ...doc.data() });
        });

        if (!recipes.length) {
            $('#recipe-list').append(`
                <h5>No recipes found</h5>
            `);
        }

        recipes.forEach((r) => {
            $('#recipe-list').append(`
                <div class="recipe">
                    <div class="pizza">
                        <div class="recipe-pizza">
                            <button class="view"><a href="#/view?id=${r.id}" class="view-link">View</a></button>
                        </div>

                        <div class="food-desc">
                            <h5 class="food-title">${r.name}</h5>

                            <h6 class="food-summary">
                            ${r.description}
                            </h6>

                            <div class="food-timer">
                                <img src="/images/time.svg" alt="Timer Logo" class="timer">
                                <h6 class="timer-desc">${r.time}</h6>
                            </div>

                            <div class="food-serving">
                                <img src="/images/servings.svg" alt="Servings Logo" class="servings">
                                <h6 class="servings-desc">${r.size}</h6>
                            </div>
                        </div>
                    </div>

                    <div class="recipes-buttons">
                        <button class="edit"><a href="#/edit?id=${r.id}" class="edit-link">Edit Recipe</a></button>
                        <button class="delete" onClick="deleteRecipe('${r.id}')">Delete</button>
                    </div>
                </div>
            `);
        });
    });
}

deleteRecipe = function(id) {
    _db.collection("Recipes")
    .doc(id)
    .delete()
    .then(() => {
        loadRecipes();

        alert('Recipe deleted successfully.');
    });
}

$(document).ready(loadRecipes);