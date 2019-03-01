'use strict';


$(document).ready(() => {

  
  $.get('/api/user').then(data => {
    const $nav = $('.navbar');
    if (data) {
      const $logout = $('<a>');
      $logout.attr('class', 'navbar');
      $logout.attr('id', 'logout-button');
      $logout.html('Logout');
      $logout.attr('href', '/logout');
      $nav.append($logout);
      const $userInfo = $('<a>');
      $userInfo.attr('class', 'navbar');
      $userInfo.attr('id', 'user-info');
      $userInfo.html(data.user.username);
      $userInfo.attr('href', '/profile');
      $nav.append($userInfo);
      trendingCall();
    } else {
      const $signin = $('<a>');
      $signin.attr('class', 'navbar');
      $signin.attr('id', 'signin-button');
      ////******** */
      // $signin.html('google sign');  ******** //remember to uncoment  when google login works

      $signin.attr('href', '/auth/google');
      $nav.append($signin);
      trendingCall();
    }
  });
});

const trendingCall = () => {
  $.get('/newsapi/trending').then(data => {
    displayArticles(data);
  });
};

const categoriesCall = cat => {
  $.get(
    `/newsapi/categories/${cat.business}/${cat.entertainment}/${cat.health}/${
      cat.science
    }/${cat.sports}/${cat.technology}`
   
  ).then(data => {
    displayArticles(data);
  });
};

$('#search-btn').on('click', event => {
  event.preventDefault();
  const query = $('#search-input')
    .val()
    .trim()
    .toLowerCase();
  document.getElementById('search-form').reset();
  $.get(`/newsapi/search/${query}`).then(data => {
      displayArticles(data);
  });
});

const displayArticles = articles => {
  $('.thumbnail-feed').empty();
  const article = articles.response.articles;
  const articleHolder = [];
  for (let i = 0; i < article.length; i++) {
    if (article[i].title && article[i].description && article[i].content) {
      let title = article[i].title;
      let source = article[i].source.name;
      let subtitle = article[i].description;
      let date = article[i].publishedAt;

      let blurb = article[i].content.split('[+')[0];
      let artUrl = article[i].url;
      let thumbnail = article[i].urlToImage;
      let formattedDate = new Date(date);
      formattedDate.toString().split('GMT')[0];

      let $title = $(`<a href=${artUrl}><div class='title'>${title}</div ></a>`);
      let $source = $(`<div class='source'>${source}</div >`);
      let $date = $(`<div class='date'><mark>PUBLISHED ON: ${formattedDate}<mark></div >`);
      let $subtitle = $(`<div class='subtitle'>'${subtitle}'</div >`);
      let $blurb = $(`<div class='blurb'>${blurb}</div >`);
      let $artUrl = $(`<a href=${artUrl}>READ ARTICLE</a>`);
      let $thumbnail = $(`<img class='thumbnail' src=${thumbnail} data-article=${i}> 
      <br>`);

      articleHolder.push({
        title: $title,
        source: $source,
        date: $date,
        subtitle: $subtitle,
        blurb: $blurb,
        arturl: $artUrl
      });
      $('.thumbnail-feed').prepend($thumbnail);
      // $('.thumbnail-feed').prepend($source);

    } else {
      articleHolder.push({ article: null });
      continue;
    }
  }

  $('.thumbnail').mouseover(function(event) {
    $('.front-page-feed').empty();
    const id = $(this).data('article');
    const article = articleHolder[id];
    $('.front-page-feed').append(
      article.title,
      article.source,
      article.thumbnail,
      article.date,
      article.subtitle,
      article.blurb,
      article.arturl
    );
  });
};




///                 NAV BAR                 ///
$('#fold-nav-line').on('click', function() {
  $('#fold-nav-line').hide();
  $('.unfold-nav').show();

  $('#unfold-nav-logo').hover(function() {
    $('.categories-list').show();

    $('.navbar').on('click', function() {
      // needs to refilter newsfeed by topic
    });
  });

  $('#x').on('click', function() {
    $('#fold-nav-line').show();
    $('.unfold-nav').hide();
    $('.categories-list').hide();
  });
});


///                 TOP HEADLINES                    ///

var frontPage;
var articleHolder = [];

// var headlines = [];

function processData(data) {
  console.log(data);

  for (var i = 0; i < data.articles.length; i++) {
    var title = data.articles[i].title;
    // console.log(title);

    var source = data.articles[i].source.name;
    // console.log(source);
    let thumbnail = data.articles[i].urlToImage;
     // console.log(thumbnail);

    var subtitle = data.articles[i].description;
    // console.log(subtitle);

    var date = data.articles[i].publishedAt;
    // console.log(date);

    var blurb = data.articles[i].content;
    // console.log(blurb);

    var artUrl = data.articles[i].url;
    // console.log(artUrl);

   

    var $title = $(
      '<a href=' + artUrl + '><div class="title">' + title + '</div ></a>'
    );
    var $date = $(
      '<div class="date"><mark>PUBLISHED AT: ' + date + '<mark></div >'
    );
    var $thumbnail = $(
      `<img class='thumbnail' src=${thumbnail} data-article=${i}> <br>`
    );
    var $source = $('<div class="source">' + source + '</div >');
    var $subtitle = $('<div class="subtitle">' + subtitle + '</div >');
    var $blurb = $('<div class="blurb">' + blurb + '</div >');
    var $artUrl = $(
      '<a  href=' +
        artUrl +
        "><img class='arrow' src='./assets/readartarrow.png'></a>"
    );

    // headlines.push(title);
    // console.log(headlines[20]);
    // module.exports = {headlines: headlines};

    articleHolder.push({
      title: $title,
      source: $source,
      date: $date,
      subtitle: $subtitle,
      blurb: $blurb,
      arturl: $artUrl,
      id: i
    });
  }

  for (var i = 0; i < data.articles.length; i++) {
    var thumbnail = data.articles[i].urlToImage;
    // console.log(thumbnail);

    var $thumbnail = $(
      `<img class ='thumbnail' src=${thumbnail} data-article=${i}> <br>`
    );

    $('.thumbnail-feed').append($thumbnail);
  }



  $('.thumbnail').hover(function() {
    $('.front-page-feed').empty();
    var id = $(this).attr('data-article');
    console.log(id);

    articleHolder.forEach(function(article) {
      // console.log(article.id)

      if (id == article.id) {
        var editedBlurb = article.blurb[0].innerText.split('[')[0];

        console.log(editedBlurb);
        var $editedBlurb = $(
          '<div class="edited-blurb">' + editedBlurb + '</div>'
        );
        $('.front-page-feed').append(
          article.title,
          article.source,
          article.date,
          article.subtitle,
          $editedBlurb,
          article.arturl
        );
      }
    });
  });
}

