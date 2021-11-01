var MODEL = (function () {

    var _getPages = function (pagesName) {
        $.get(`./pages/${pagesName}/${pagesName}.html?t=${Date.now()}`, function (data){
            $("#app").html(data);
        });
    };

    return {
        getPages : _getPages,
    };
})();