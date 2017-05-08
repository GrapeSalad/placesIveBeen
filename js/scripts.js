$(function(){
  $("form#places").submit(function(event){
    event.preventDefault();
    var userLocation = $("input#location").val();
    var userLandmarks = $("input#landmarks").val();
    var userTime = $("input#time").val();
    var userNotes = $("input#notes").val();
    var userReturn = (($("input:radio[name=returnBool]:checked").val()) === "true");
    var userStreet = $("input#street").val();
    var userCity = $("input#city").val();
    var userState = $("input#state").val();

    var user =  new Places(userLocation, userLandmarks, userTime, userNotes, userReturn);
    var userAddress = new Address(userStreet, userCity, userState);
    console.log(userAddress);

    $(".output").append("<span class='clickable'><li>" + user.locations + "</li></span>");
    $(".clickable").last().click(function(){
      $("#info").show();
      $("#info h2").text(user.landLocation());
      $(".liLandmark").text(user.landmarks);
      $(".liTime").text(user.time);
      $(".liNotes").text(user.notes);
      $(".liRec").text(user.recommendation());
      $(".liAddress").text(userAddress.fullAddress());
    });
  });
  $("#refresh").click(function(){
    // location.reload();
    $("input#location").val("");
    $("input#landmarks").val("");
    $("input#time").val("");
    $("input#notes").val("");
    $("input#street").val("");
    $("input#city").val("");
    $("input#state").val("");
  });
});


//BUSINESS LOGIC
function Places(userLocation, userLandmarks, userTime, userNotes, userReturn) {
  this.locations = userLocation,
  this.landmarks = userLandmarks,
  this.time = userTime,
  this.notes = userNotes,
  this.recommend = userReturn;
  this.homeAddress = [];
};

function Address(userStreet, userCity, userState){
  this.street = userStreet;
  this.city = userCity;
  this.state = userState;
}

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

Address.prototype.fullAddress = function() {
  return this.street + ", " + this.city + ", " + this.state;
}

function resetFields() {
  // location.reload();
  $("input#location").val("");
  $("input#landmarks").val("");
  $("input#time").val("");
  $("input#notes").val("");
  $("input#street").val("");
  $("input#city").val("");
  $("input#state").val("");
}

//MAP WORK

Address.prototype.mapAddress = function() {
  return this.city + ", " + this.state;
};

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644}
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
