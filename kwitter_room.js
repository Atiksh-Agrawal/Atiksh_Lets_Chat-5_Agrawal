//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
      apiKey: "AIzaSyC0HWT4agxXoIIp-W6fgIFgC_TGTxnC48o",
      authDomain: "kwitter-d5926.firebaseapp.com",
      databaseURL: "https://kwitter-d5926-default-rtdb.firebaseio.com",
      projectId: "kwitter-d5926",
      storageBucket: "kwitter-d5926.appspot.com",
      messagingSenderId: "617807387216",
      appId: "1:617807387216:web:54afb4b97d1157b42dcf55"
    };

    firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("username");
document.getElementById("Welcome_Name").innerHTML = "Welcome " + user_name + " !";


function addRoom() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            porpuse: "adding roomname"
      });

      localStorage.setItem("RoomName", room_name);
      window.location = "kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log("roomname")
                  //Start code
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}

function redirectToRoomName(name){
   localStorage.setItem("roomaname",name) ;
   window.location = "kwitter_page.html";   
}

function Logout(){
      localStorage.removeItem("username");
      localStorage.removeItem("roomname");
      window.location = "index.html";
}

getData();