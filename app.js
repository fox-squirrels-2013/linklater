window.onload=function(){

  // var firebaseUrl = 'https://won3lsf1inc.firebaseio-demo.com/'
  var firebaseUrl = 'https://linklater.firebaseio.com/'
  var linklater = new Firebase(firebaseUrl);


  $('#submit').click(function(e) {
    // console.log(this);
    console.log('clicked!');
  });

  // linklater.set('link')

};
