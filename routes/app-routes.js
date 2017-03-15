var request = require("request");
var cheerio = require("cheerio");

var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");

module.exports = function(app) {
    app.get("/scrape", function(req, res) {
        request("https://www.dealcatcher.com/deals", function(error, response, html) {
            var $ = cheerio.load(html);
            $("article h3").each(function(i, element) {
                var result = {};

                result.title = $(this).children("a").text();
                result.link = "https://www.dealcatcher.com" + $(this).children("a").attr("href");

                var newArticle = new Article(result);

                newArticle.save(function(err, doc) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log(doc)
                    }
                });
            });
        });
        res.send("Scrape Done!")
    });

    app.get("/articles", function(req, res) {
        Article.find({}, function(error, articles) {
            if (error) {
                console.log(error);
            } else {
                res.json(articles)
            }
        });
    });
}