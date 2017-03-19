var request = require("request");
var cheerio = require("cheerio");

var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");

module.exports = function(app) {

    // route to scrape deals data from https://www.dealcatcher.com and save it to mongodb
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
    // route to grap articles that is not saved
    app.get("/notSavedArticles", function(req, res) {
        Article.find({"saved": false}, function(error, articles) {
            if (error) {
                console.log(error);
            } else {
                res.json(articles)
            }
        });
    });
    // find saved articles to display it in the saved items page
    app.get("/savedArticles", function(req, res) {
        Article.find({"saved": true}, function(error, articles) {
            if (error) {
                console.log(error);
            } else {
                res.json(articles)
            }
        });
    });
    // grap an article by id and populate comments if found.
    app.get("/article/:id", function(req, res) {
        Article.findOne({"_id": req.params.id})
        .populate("comment")
        .exec(function(error, article) {
            if (error) {
                console.log(error);
            } else {
                res.json(article)
            }
        });
    });

    // route to post a new comment
    app.post("/article/:id", function(req, res) {

        var newComment = new Comment(req.body);

        newComment.save(function(error, comment) {
            if (error) {
                console.log(error);
            } else {
                Article.findOneAndUpdate({"_id": req.params.id}, {$push: {"comment": comment.id}})
                .exec(function(error, data) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.send(data);
                    }
                });
            }
        });
    });

    // route to save articles
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

    // route to remove article from saved list to home list
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

    // route to delete article form the website
    app.get("/delete/:id", function(req, res) {
        Article.find({"_id": req.params.id}).remove()
        .exec(function(error, deleted) {
            if (error) {
                console.log(err);
            } else {
                res.send(deleted);
            }
        });
    });
}