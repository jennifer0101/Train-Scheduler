var firebaseConfig = {
  apiKey: "AIzaSyDZsBWR5VtVg7GupeU-1yWK_M9m6jrnK9Y",
  authDomain: "jenf-train-scheduler.firebaseapp.com",
  databaseURL: "https://jenf-train-scheduler.firebaseio.com",
  projectId: "jenf-train-scheduler",
  storageBucket: "",
  messagingSenderId: "54508970508",
  appId: "1:54508970508:web:cb015529c9c35217"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();


//button to add train name, destination, t-time, frequency
$("#submit").on("click", function (event) {
  event.preventDefault();

  //grabs user input
  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var firstTime = moment($("#train-time").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#frequency").val().trim();
  console.log(firstTime);


  //creates local "temporary" object for holding train data
  var newTrain = {
    tName: trainName,
    tDestination: destination,
    tTime: firstTime,
    tFrequency: frequency
  };

  //uploads train data to database
  database.ref().push(newTrain);

  //clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#train-time").val("");
  $("#frequency").val("");
});

//create firebase event for adding trains to database, row in html when entry is added by user
database.ref().on("child_added", function (childSnapshot) {

  //store everything into a variable
  var trainName = childSnapshot.val().tName;
  var destination = childSnapshot.val().tDestination;
  var firstTime = childSnapshot.val().tTime;
  var frequency = childSnapshot.val().tFrequency;

  //First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  // Current Time
  var currentTime = moment();
  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  // Minute Until Train
  var tMinutesTillTrain = frequency - tRemainder;
  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var arrive = (moment(nextTrain).format("hh:mm"));

  //creat new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(arrive),
    $("<td>").text(tMinutesTillTrain),
   
  );

  //append new row to table
  $("#train-schedule > tbody").append(newRow);
  console.log(newRow);
})




