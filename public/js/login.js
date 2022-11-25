const chatForm = document.getElementById("room");

const socket = io();

socket.on("roomNames", (data) => {
    chatForm.innerHTML = `${data.map(user => `<option value=${user.name}>${user.name}</option>`).join("")}`;
});