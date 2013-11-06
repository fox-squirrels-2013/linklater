window.onload=function(){
  var firebaseUrl = 'https://linklater.firebaseio.com/'
  var linklater = new Firebase(firebaseUrl);


  ////////////////////////////////////////////////////////////////////
  //
  // Links are the primary model of this app. 
  //
  // links have several functions defined below and map to the firebase db
  //
  ////////////////////////////////////////////////////////////////////

  function Link(snap){
    link          = snap.val();
    this.title    = link.title;
    this.url      = link.url;
    this.likes    = 1;
    this.dislikes = 0;
  };

  Link.prototype.html = function(){
    markup = '<div class="linky"><a target="_new" href="'
           + this.url 
           + '">'
           + this.title
           + '</a></div><br>';

    return markup;
  };

  Link.prototype.like = function(val){
    this.likes += val;
  }

  Link.prototype.dislike = function(val){
    this.dislikes -= val;
  }

  Link.prototype.worth = function(){
    return this.likes - this.dislikes;
  }

  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////


  // bind to the click function of submit and push new data
  $('#submit').click(function(e) {
    title = $('#title').val();
    url = $('#url').val();
    linklater.push({title: title, url: url});
  });

  // callback from firebase
  linklater.on('child_added', function(snapshot){
    var link = new Link(snapshot);
    $('#links').prepend(link.html());
  });
};
