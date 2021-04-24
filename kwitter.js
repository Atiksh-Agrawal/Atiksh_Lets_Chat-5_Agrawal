function Log_in(){
    USER_NAME = document.getElementById("user_name").value;
    window.location = "kwitter_room.html";
    localStorage.setItem("username",USER_NAME);
}