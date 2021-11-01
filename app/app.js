function route() {
    let hashTAG = window.location.hash;
    let id = hashTAG.replace("#/", "");

    MODEL.getPages(id);
}

function setAuthed(authed) {
    if (!authed) {
        $.get(`./nav/unauthed.html`, function (data) {
            $("#nav").html(data);
        });
        $.get(`./footer/unauthed.html`, function (data) {
            $("#footer").html(data);
        });
    } else {
        $.get(`./nav/authed.html`, function (data) {
            $("#nav").html(data);
        });
        $.get(`./footer/authed.html`, function (data) {
            $("#footer").html(data);
        });
    }
}

function initSite() {
    $(window).on('hashchange', route);
    route();
    setAuthed(false);
}

function createAccount() {
    const inputs = $('#signUp :input');
    const values = {};
    inputs.each(function() {
        values[this.name] = $(this).val();
    });

    firebase
    .auth()
    .createUserWithEmailAndPassword(values.email, values.password)
    .then((userCredential) => {
    setAuthed(true);

    inputs.each(function() {
        $(this).val('');
    });
    })
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    // ..
    });

    return false;
}

$(document).ready(function (){
   initSite();
});