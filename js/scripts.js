$(function(){
  $("form#places").submit(function(event){
    event.preventDefault();
    var userLocation = $("input#location").val();
    var userLandmarks = $("input#landmarks").val();
    var userTime = $("input#time").val();
    var userNotes = $("input#notes").val();
    var userReturn = (($("input:radio[name=returnBool]:checked").val()) === "true");
    var user =  new Places(userLocation, userLandmarks, userTime, userNotes, userReturn);
    $(".output").append("<li><span class='clickable'>" + user.locations + "</span></li>");
    $(".clickable").last().click(function(){
      $("#info").show();
      $("#info h2").text(user.landLocation());
      $(".liLandmark").text(user.landmarks);
      $(".liTime").text(user.time);
      $(".liNotes").text(user.notes);
      $(".liRec").text(user.recommendation());
    });
  });
  $("#refresh").click(function(){
    location.reload();
  });
});


//BUSINESS LOGIC
function Places(userLocation, userLandmarks, userTime, userNotes, userReturn) {
  this.locations = userLocation,
  this.landmarks = userLandmarks,
  this.time = userTime,
  this.notes = userNotes,
  this.recommend = userReturn
};

Places.prototype.landLocation = function() {
  return this.landmarks + " in " + this.locations;
};

Places.prototype.recommendation = function() {
  if (this.recommend === true) {
    return "I would recommend";
  } else {
    return "I would NOT recommend";
  }
};
