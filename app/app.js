let _db;
let _user;

function route() {
    let hashTAG = window.location.hash.split('?')[0];
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
    
    firebase
    .auth()
    .onAuthStateChanged(function(user) {
        if (user && user.email) {
          setAuthed(true);
          _db = firebase.firestore();
          _user = user;
        } else {
          setAuthed(false);
        }
      });
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
        inputs.each(function() {
            $(this).val('');
        });
    })
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    });

    return false;
}

function login() {
    const inputs = $('#login :input');
    const values = {};
    inputs.each(function() {
        values[this.name] = $(this).val();
    });

    firebase
    .auth()
    .signInWithEmailAndPassword(values.email, values.password)
    .then((userCredential) => {

    inputs.each(function() {
        $(this).val('');
    });
    })
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    });

    return false;
}

function logout(){
    firebase
    .auth()
    .signOut();
}

$(document).ready(function (){
   initSite();
});