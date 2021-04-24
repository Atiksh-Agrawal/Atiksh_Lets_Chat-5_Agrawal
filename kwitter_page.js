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
room_name = localStorage.getItem("RoomName");

function SEND() {
    msg = document.getElementById("msg").value;
    console.log(msg);
    console.log(room_name);
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });

    document.getElementById("msg").innerHTML = "";
}



function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("OUTPUT").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;



                Name = message_data['name'];
                Message = message_data['message'];
                Likes = message_data['like'];

                NAME_html_tag = "<h4>" + Name + "<img src='tick.png' class ='user_tick'> </h4>";
                Message_html_tag = "<h4 class = 'message_h4'>" + Message + "</h4>";
                like_html_tag = "<button class = 'btn btn-warning' id = " + firebase_message_id + " value = " + Likes + " onclick = 'Update_Like(this.id)'>";
                span_button_tag = "<span class = 'glyphicon glyphicon-thumbs-up'>Like:" + Likes + "</span></button><hr>";


                row = NAME_html_tag + Message_html_tag + like_html_tag + span_button_tag;
                document.getElementById("OUTPUT").innerHTML += row;
            }
        });
    });
}

function Logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("RoomName");
    window.location = "index.html";
}

function Update_Like(message_id) {
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });
}

getData();