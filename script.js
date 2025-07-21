const hotel = [];
const totalFloors = 10;
const roomMap = document.getElementById("hotel");

// Initialize hotel structure
for (let floor = 1; floor <= totalFloors; floor++) {
  const rooms = [];
  const roomCount = floor === 10 ? 7 : 10;
  for (let i = 1; i <= roomCount; i++) {
    const roomNumber = floor === 10 ? 1000 + i : floor * 100 + i;
    rooms.push({ number: roomNumber, booked: false });
  }
  hotel.push(rooms);
}

function renderHotel() {
  roomMap.innerHTML = "";
  for (let f = hotel.length - 1; f >= 0; f--) {
    const floorDiv = document.createElement("div");
    floorDiv.className = "floor";
    hotel[f].forEach(room => {
      const roomDiv = document.createElement("div");
      roomDiv.className = "room " + (room.booked ? "booked" : "available");
      roomDiv.textContent = room.number;
      floorDiv.appendChild(roomDiv);
    });
    roomMap.appendChild(floorDiv);
  }
}

function bookRooms() {
  const count = parseInt(document.getElementById("roomCount").value);
  if (count < 1 || count > 5) return alert("Book 1 to 5 rooms only!");

  let booked = false;

  // Try each floor
  for (let floor of hotel) {
    const available = floor.filter(r => !r.booked);
    if (available.length >= count) {
      for (let i = 0; i < count; i++) available[i].booked = true;
      booked = true;
      break;
    }
  }

  if (!booked) {
    let allAvailable = [];
    hotel.forEach((floor, fIndex) => {
      floor.forEach((room, rIndex) => {
        if (!room.booked) {
          allAvailable.push({ ...room, fIndex, rIndex });
        }
      });
    });

    allAvailable.sort((a, b) => (a.fIndex * 2 + a.rIndex) - (b.fIndex * 2 + b.rIndex));
    for (let i = 0; i < count && i < allAvailable.length; i++) {
      const { fIndex, rIndex } = allAvailable[i];
      hotel[fIndex][rIndex].booked = true;
    }
  }

  renderHotel();
}

function randomizeRooms() {
  hotel.forEach(floor => {
    floor.forEach(room => {
      room.booked = Math.random() < 0.3;
    });
  });
  renderHotel();
}

function resetBooking() {
  hotel.forEach(floor => {
    floor.forEach(room => room.booked = false);
  });
  renderHotel();
}

renderHotel();
