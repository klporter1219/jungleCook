function route() {
    let hashTAG = window.location.hash;
    let id = hashTAG.replace("#/", "");

    MODEL.getPages(id);
}

function initSite() {
    $(window).on('hashchange', route);
    route();
}

$(document).ready(function (){
   initSite();
});