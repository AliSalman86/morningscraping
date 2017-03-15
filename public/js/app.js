// When clicking "Scrap me Deals" button
// scrape route would be called to scrape data
$("#scrapper").on("click", function() {
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).done(function() {
        getArticles();
    });
});

function getArticles() {
    $("#artWell").empty();
    $.getJSON("/articles", function(data) {
        for (var i = 0; i<data.length; i++) {
            $("#artWell").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
        }
    });
}

