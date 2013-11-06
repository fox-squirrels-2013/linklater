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

  var linkList = {};

  function Link(snap){
    link          = snap.val();
    this.name     = snap.name();
    this.title    = link.title;
    this.url      = link.url;
    this.likes    = link.likes;
    this.dislikes = link.dislikes;
  };

  Link.prototype.html = function(){
    markup = '<div class="linky">'
           + '<div class="like" id="'
           + this.name
           + '">^</div>'
           + '<div class="dislike" id="'
           + this.name
           + '">v</div>' 
           + '<a target="_new" href="'
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

  // got this from line 48 of https://www.firebase.com/tutorial/#session/hoz8ydoso7d
  // and ... it doesn't work :(
  // Link.prototype.id = function(){
  //   return this.name.replace(/[^a-z0-9\-\_]/gi,'');
  // }

  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////

  $('#links').on('click', 'div.like', function(e){
    link_id = e.target.id;
    link = linkList[link_id];   
    linklater.child(link_id).update({likes: link.likes += 1});
  });

  $('#links').on('click', 'div.dislike', function(e){
    link_id = e.target.id;
    link = linkList[link_id];
    linklater.child(link_id).update({dislikes: link.dislikes += 1});
  });

  // bind to the click function of submit and push new data
  $('#submit').click(function(e) {
    title = $('#title').val();
    url = $('#url').val();
    linklater.push({title: title, url: url});
  });

  // callback from firebase
  linklater.on('child_added', function(snapshot){
    var link = new Link(snapshot);
    linkList[link.name] = link;
    $('#links').prepend(link.html());
  });
};
