function changeColor(){
  var color = getRandomColor();
  document.body.style.background = color;
  
}
function getRandomColor(){
  var r = (Math.round(Math.random()*127) + 127).toString(16);
  var g = (Math.round(Math.random()*127) + 127).toString(16);
  var b = (Math.round(Math.random()*127) + 127).toString(16);
  return '#'+r+g+b;
}

$(document).ready(function(e){
  getRandomColor();
  changeColor();
  $.ajax({
      url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(a) {
        $("#quotes").html(a[0].content + "<p>- " + a[0].title + "</p>")
        
        var tweet = a[0].content;
        tweet = tweet.replace("<p>", "");
        tweet = tweet.replace("&#8217;", "'");
        tweet = tweet.replace("&#8220;", "“");
        tweet = tweet.replace("&#8221;", "”");
        tweet = tweet.replace("&#8216;", "‘");
        tweet = tweet.replace("&#8217;", "’");
        tweet = tweet.replace("\u2019", "'");
        tweet = tweet.replace("\u2018", "'");
        tweet = tweet.replace("\u2014", "—");
        tweet = tweet.replace("&#8211;", "–");
        tweet = tweet.replace("&#8230;", "…");
        tweet = tweet.replace("</p>", "");
        var tweetTitle = a[0].title;
        $("#tweet-it").attr("href", "https://twitter.com/intent/tweet?text=" + decodeURI(tweet) + "--"+decodeURI(tweetTitle));
      },
      cache: false
   });
});

$("#next-quote").on("click", function(e) {
  e.preventDefault();
  $.ajax({
      url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(a) {
        $("#quotes").html(a[0].content + "<p>— " + a[0].title + "</p>")
        var tweet = a[0].content;
        tweet = tweet.replace("<p>", "");
        tweet = tweet.replace("&#8217;", "'");
        tweet = tweet.replace("&#8220;", "“");
        tweet = tweet.replace("&#8221;", "”");
        tweet = tweet.replace("&#8216;", "‘");
        tweet = tweet.replace("&#8217;", "’");
        tweet = tweet.replace("\u2019", "'");
        tweet = tweet.replace("\u2018", "'");
        tweet = tweet.replace("\u2014", "—");
        tweet = tweet.replace("&#8211;", "–");
        tweet = tweet.replace("&#8230;", "…");
        tweet = tweet.replace("</p>", "");
        var tweetTitle = a[0].title;
        $("#tweet-it").attr("href", "https://twitter.com/intent/tweet?text=" + decodeURI(tweet) + "--"+decodeURI(tweetTitle));
      },
      cache: false
   });
  
});
 
    