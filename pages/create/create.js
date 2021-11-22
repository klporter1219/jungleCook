const recipe = {
    image: '',
    name: '',
    description: '',
    time: '',
    size: '',
    instructions: [''],
    ingredients: [''],
    userId: null,
};

const ingredient = `
<input class="add-form-input ingredient" type="text" placeholder="Enter an ingredient" />
`;

const instruction = `
<input class="add-form-input instruction" type="text" placeholder="Enter an instruction" />
`;

function addIngredient() {
    $('#ingredients').append(ingredient);
}

function addInstruction() {
    $('#instructions').append(instruction);
}

function createRecipe() {
    const newRecipe = _db && _db.collection('Recipes').doc();

    if (!newRecipe) alert('Unable to create recipe');

    recipe.name = $('#name').val();
    recipe.description = $('#desc').val();
    recipe.time = $('#time').val();
    recipe.size = $('#size').val();

    recipe.instructions = $('.instruction').map((_, e) => e.value).get().join(',');

    recipe.ingredients = $('.ingredient').map((_, e) => e.value).get().join(',');

    recipe.userId = _user.uid;

    newRecipe.set(recipe);

    alert('Successfully created!');

    window.location="/#/recipes"
}