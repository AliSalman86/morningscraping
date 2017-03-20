// When clicking "Scrap me Deals" button
// scrape route would be called to scrape data
$("#scrapper").on("click", function() {
    $.ajax({
        method: "GET",
        url: "/scrape",
    }).done(function() {
        getNotSavedArticles();
    });
});

function getNotSavedArticles() {
    $("#artWell").empty();
    $.getJSON("/notSavedArticles", function(data) {
        for (var i = 0; i < 20; i++) {
            var panel = $("<div>").addClass("panel panel-success");
            var panHeading = $("<div>").addClass("panel-heading panHeader");
            var leftSide = $("<div>").addClass("col-xs-9");
            var title = $("<h3>").addClass("panel-title title").text(data[i].title);
            var rightSide = $("<div>").addClass("col-xs-3");
            var btnSave = $("<button>").addClass("btn btn-primary save").text("Save Article");
            var btnDelete = $("<button>").addClass("btn btn-danger delete").text("Delete Article");
            btnSave.attr("data-id", data[i]._id);
            btnDelete.attr("data-id", data[i]._id);
            var body = $("<div>").addClass("panel-body").text(data[i].link);
            leftSide.append(title);
            panHeading.append(leftSide);
            rightSide.append(btnSave);
            rightSide.append(btnDelete);
            panHeading.append(rightSide);
            panel.append(panHeading);
            panel.append(body);
            $("#artWell").append(panel);
        }
    });
}

$(document).on("click", ".save", function() {
    var articleID = $(this).attr("data-id");
    $.ajax({
        type: "GET",
        url: "/save/" + articleID
    });
    console.log(articleID);
    getNotSavedArticles();
});

$(document).on("click", ".delete", function() {
    var articleID = $(this).attr("data-id");
    $.ajax({
        type: "GET",
        url: "/delete/" + articleID
    });
    console.log(articleID);
    getNotSavedArticles();
});



getNotSavedArticles();