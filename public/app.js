// 1. Ambil semua DOM elements
const joinSection = document.getElementById("join-section");
const callSection = document.getElementById("call-section");
const roomIdInput = document.getElementById("room-id");
const joinBtn = document.getElementById("join-btn");
const errorMsg = document.getElementById("error");
const currentRoom = document.getElementById("current-room");
const statusText = document.getElementById("status");
const localVideo = document.getElementById("local-video");
const remoteVideo = document.getElementById("remote-video");
const muteBtn = document.getElementById("mute-btn");
const videoBtn = document.getElementById("video-btn");
const endBtn = document.getElementById("end-btn");

// 2. Global variables
let socket;
let localStream;
let peerConnection;
let roomId;

// 3. WebRTC Configuration
const config = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

// 4. Init Socket.io
socket = io();

console.log("App loaded!");

// 5. Event Listener untuk Join Button
joinBtn.addEventListener("click", async () => {
  roomId = roomIdInput.value.trim();

  if (!roomId) {
    errorMsg.textContent = "Masukkan Room ID!";
    return;
  }

  try {
    // Minta akses camera/microphone
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    // Tampilkan di local video
    localVideo.srcObject = localStream;

    // Switch ke call section
    joinSection.style.display = "none";
    callSection.style.display = "block";
    currentRoom.textContent = roomId;

    // Emit ke server
    socket.emit("join-room", roomId);

    console.log("Joined room:", roomId);
  } catch (error) {
    console.error("Error:", error);
    errorMsg.textContent = "Tidak bisa akses kamera/mikrofon";
  }
});
