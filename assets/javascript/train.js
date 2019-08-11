var firebaseConfig = {
    apiKey: "AIzaSyDZsBWR5VtVg7GupeU-1yWK_M9m6jrnK9Y",
    authDomain: "jenf-train-scheduler.firebaseapp.com",
    databaseURL: "https://jenf-train-scheduler.firebaseio.com",
    projectId: "jenf-train-scheduler",
    storageBucket: "",
    messagingSenderId: "54508970508",
    appId: "1:54508970508:web:cb015529c9c35217"
  };

  firebase.initializeApp(Config);

  var database = firebase.database();
  console.log(database.ref());
  database.ref().push({
     name: "name"   
  })
  $("#submit").on("click", function(){
        var trainName = $("#train-name").val().trim;
        var destination = $("#destination").val().trim;
        var tFrequency = $("#frequency").val().trim;
        var firstTime = $("#train-time").val().trim;
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);
        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);
        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  })

   

 
//listener for firebase database changes
