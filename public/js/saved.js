function getSavedArticles() {
    $.getJSON("/savedArticles", function(data) {
        $("#savedArtWell").empty();
        for (var i = 0; i < data.length; i++) {
            var panel = $("<div>").addClass("panel panel-success");
            var panHeading = $("<div>").addClass("panel-heading panHeader");
            var leftSide = $("<div>").addClass("col-xs-9");
            var title = $("<h3>").addClass("panel-title title").text(data[i].title);
            var rightSide = $("<div>").addClass("col-xs-3");
            var btnNote = $("<button>").addClass("btn btn-primary note").text("Add Note");
            var btnRemove = $("<button>").addClass("btn btn-danger remove").text("Remove Article");
            btnNote.attr("data-id", data[i]._id);
            btnRemove.attr("data-id", data[i]._id);
            var body = $("<div>").addClass("panel-body").text(data[i].link);
            leftSide.append(title);
            panHeading.append(leftSide);
            rightSide.append(btnNote);
            rightSide.append(btnRemove);
            panHeading.append(rightSide);
            panel.append(panHeading);
            panel.append(body);
            $("#savedArtWell").append(panel);
        }
    });
}

$(document).on("click", ".remove", function() {
    var articleID = $(this).attr("data-id");
    $.ajax({
        type: "GET",
        url: "/unsave/" + articleID
    });
    console.log(articleID);
    getSavedArticles();
});

getSavedArticles();