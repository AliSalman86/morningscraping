// When clicking "Scrap me Deals" button
// scrape route would be called to scrape data
$("#scrapper").on("click", function() {
    $.ajax({
        method: "GET",
        url: "/scrape",
        success: getArticles
    });
});

function getArticles() {
    $("#artWell").empty();
    $.getJSON("/articles", function(data) {
        for (var i = 0; i<data.length; i++) {
            var panel = $("<div>").addClass("panel panel-success");
            var panHeading = $("<div>").addClass("panel-heading panHeader");
            var leftSide = $("<div>").addClass("col-xs-9");
            var title = $("<h3>").addClass("panel-title title").text(data[i].title);
            var rightSide = $("<div>").addClass("col-xs-3");
            var btnSave = $("<button>").addClass("btn btn-primary save").text("Save Article");
            var btnDelete = $("<button>").addClass("btn btn-danger delete").text("Delete Article");
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

getArticles();