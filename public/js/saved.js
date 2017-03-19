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

$(document).on("click", ".note", function() {
    $("#myModal").modal('show');
    var artId = $(this).attr("data-id");
    // assign the post id to the save btn
    $(".commentSave").attr("data-id", artId);
    $.ajax({
        method: "GET",
        url: "/article/" + artId
    }).done(function(data) {
        $("#myModalLabel").text(data.title + " Comments");
        console.log(data)
        // display comments if founded
        if (data.comment) {
            $("#commentHolder").empty();
            for (var i = 0; i < data.comment.length; i++) {
                var panel = $("<div>").addClass("panel panel-default");
                var body = $("<div>").addClass("panel-body").text(data.comment[i].body);
                body.append("<button type='button' class='close'><span aria-hidden='true'>&times;</span></button>")
                panel.append(body);
                $("#commentHolder").append(panel);
            }
        }
    });
});


// posting a new comment when save camment button on the modal clicked
$(document).on("click", ".commentSave", function() {
    var artIdNo = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/article/" + artIdNo,
        data: {
            body: $("#textBox").val()
        }
    })
    $("#textBox").val("");
});

getSavedArticles();