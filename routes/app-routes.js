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
                result.saved = false;
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

    app.get("/notSavedArticles", function(req, res) {
        Article.find({"saved": false}, function(error, articles) {
            if (error) {
                console.log(error);
            } else {
                res.json(articles)
            }
        });
    });
    // find save articles to display it in the saved items page
    app.get("/savedArticles", function(req, res) {
        Article.find({"saved": true}, function(error, articles) {
            if (error) {
                console.log(error);
            } else {
                res.json(articles)
            }
        });
    });
    app.get("/save/:id", function(req, res) {
        Article.findOneAndUpdate({"_id": req.params.id}, {"saved": true})
        .exec(function(error, saved) {
            if (error) {
                console.log(err);
            } else {
                res.send(saved);
            }
        });
    });
    app.get("/unsave/:id", function(req, res) {
        Article.findOneAndUpdate({"_id": req.params.id}, {"saved": false})
        .exec(function(error, removed) {
            if (error) {
                console.log(err);
            } else {
                res.send(removed);
            }
        });
    });
}