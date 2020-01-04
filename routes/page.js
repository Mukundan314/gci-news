const createError = require('http-errors');
const express = require('express');
const NewsAPI = require('newsapi');

var newsapi = new NewsAPI('55c1fb1120be45aab761b01d1c00d16d');
var router = express.Router();

async function getArticles(page) {
  var response = await newsapi.v2.everything({
    q: 'linux OR android OR open-source',
    sources: 'google-news',
    sortBy: 'publishedAt',
    page: page,
  });

  return response.articles;
}

/* GET home page. */
router.get('/:page', function(req, res, next) {
  getArticles(req.params.page).then(articles => {
    res.render('page', { articles, page: parseInt(req.params.page) })
  }).catch((err) => {
    next(createError(500));
  });
});

module.exports = router;
