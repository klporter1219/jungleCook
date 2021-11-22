let _id;

const notFound = function() {
    alert('Recipe not found. Returning to recipe list');

    window.location = '/#/recipes'
}

const ingredient = `
<input class="list-form-input ingredient" type="text"  placeholder="Enter an ingredient" />
`;

const prefilledIngredient = function(val) {
    return `
        <input class="list-form-input ingredient" type="text"  placeholder="Enter an ingredient" value="${val}" />
    `;
}

const instruction = `
<input class="list-form-input instruction" type="text" placeholder="Enter an instruction" />
`;

const prefilledInstruction = function(val) {
    return `
    <input class="list-form-input instruction" type="text" placeholder="Enter an instruction" value="${val}" />
    `;
}

const loadRecipe = function() {
    $('#edit-wrapper').hide();

    const editParams = new URLSearchParams(window.location.hash.split('?')[1]);
    
    if (!editParams.has('id')) {
        notFound();
    }

    if (!_db) {
        return setTimeout(loadRecipe, 100);
    }

    const id = editParams.get('id');

    _id = id;

    _db
    .collection("Recipes")
    .doc(id)
    .get()
    .then((doc) => {
        if (doc.exists) {
            const recipe = doc.data();

            $('#name').val(recipe.name);
            $('#desc').val(recipe.description);
            $('#time').val(recipe.time);
            $('#size').val(recipe.size);

            recipe.instructions.split(',').forEach((instruction) => {
                $('#instructions').append(prefilledInstruction(instruction));
            });

            recipe.ingredients.split(',').forEach((ingredient) => {
                $('#ingredients').append(prefilledIngredient(ingredient));
            });

        $('#edit-wrapper').show();
        $('#loading').hide();
        } else {
            notFound();
        }
    });
}

const addIngredient = function() {
    $('#ingredients').append(ingredient);
}

const addInstruction = function() {
    $('#instructions').append(instruction);
}

const saveRecipe = function() {
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


    recipe.name = $('#name').val();
    recipe.description = $('#desc').val();
    recipe.time = $('#time').val();
    recipe.size = $('#size').val();

    recipe.instructions = $('.instruction').map((_, e) => e.value).get().join(',');

    recipe.ingredients = $('.ingredient').map((_, e) => e.value).get().join(',');

    recipe.userId = _user.uid;

    _db
    .collection("Recipes")
    .doc(_id)
    .set(recipe)

    alert('Successfully saved!');

    window.location="/#/recipes"
}

$(document).ready(loadRecipe);
