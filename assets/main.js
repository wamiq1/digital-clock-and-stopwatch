var currentTime;
var hours = 0, minutes = 0, seconds = 0;
var totalSecond = 60, totalMinutes = 60;
var clockDigital = true;
var stopWatch =  true;

var interval, timeOut;

var stopWatchTimer = document.getElementById('stopwatch');

if (clockDigital == true) {
  var heading = "Digital Clock";
  document.getElementById("main-heading").innerHTML = heading;
}

function digitalClock() {
  document.getElementById("clock").classList.add("active");
  if (clockDigital == false) {
    var currentDate = new Date();
    hours = currentDate.getHours();
    minutes = currentDate.getMinutes();
    seconds = currentDate.getSeconds();
    var timeFormat = "AM";

    if (hours == 0) {
      hours = 12;
    }
    if (hours > 12) {
      hours = hours - 12;
      timeFormat = "PM";
    }

    var hh = (hours < 10) ? "0" + hours : hours;
    var mm = (minutes < 10) ? "0" + minutes : minutes;
    var ss = (seconds < 10) ? "0" + seconds : seconds;

    currentTime = hh + " : " + mm + " : "  + ss + "  "  + timeFormat;

    document.getElementById("clock").innerText = currentTime;
    interval = setInterval(digitalClock, 1000);
  }
}

function startDigitalClock() {
  if (clockDigital == true) {
    clockDigital = false
    digitalClock();
  }
}

function stopDigitalClock() {
  clockDigital = true;
}

function stopWatchClock() {
  if (stopWatch == false) {
    seconds = parseInt(seconds);
    minutes = parseInt(minutes);
    hours = parseInt(hours);
    seconds = seconds + 1;

    if (seconds == totalSecond) {
      minutes = minutes + 1;
      seconds = 0;
    }
    if (minutes == totalMinutes) {
      hours = hours + 1;
      minutes = 0;
      seconds = 0;
    }

    if (seconds < 10 || seconds == 0) {
      seconds = '0' + seconds;
    }
    if (minutes < 10 || minutes == 0) {
      minutes = '0' + minutes;
    }
    if (hours < 10 || hours == 0) {
      hours = '0' + hours;
    }

    stopWatchTimer.innerHTML = hours + ':' + minutes + ':' + seconds;

    setTimeout("stopWatchClock()", 1000);
  }
}

function startStopWatch() {
  if (stopWatch == true) {
    stopWatch = false;
    stopWatchClock()
  }
}

function stopStopWatch() {
  stopWatch = true;
}

function resetStpWatch() {
  stopWatchTimer.innerHTML = '00:00:00';
  stopWatch = true;
  hours = 0;
  minutes = 0;
  seconds = 0;
}

function showStopWatch() {
  clockDigital = true
  clearInterval(interval);
  hours = 0;
  minutes = 0;
  seconds = 0;
  var heading = "StopWatch";
  document.getElementById("main-heading").innerHTML = heading;
  document.getElementById("clock").style.display = "none";
  document.getElementById("digital-clock").style.display = "none"
  document.getElementById('stopwatch').style.display = "flex";
  document.getElementById('shop-watch').style.display = "block";
}

function showDigitalClock() {
  var heading = "Digital Clock";
  document.getElementById("main-heading").innerHTML = heading;
  document.getElementById("digital-clock").style.display = "block"
  document.getElementById("clock").style.display = "flex";
  document.getElementById('stopwatch').style.display = "none";
  document.getElementById('shop-watch').style.display = "none";
}


var arrList = [];
var isUpdate = null;
var container = document.getElementById("container");

var btn = document.getElementById("btnForm");
btn.innerText = "Add";

function addItem() {
  event.preventDefault();
  var listItem = document.getElementById("additem");

  if (isUpdate !== null) {
    return updateItem();
  }

  if (!arrList.includes(listItem.value) && listItem.value != "") {
    arrList.push({
      created_at: new Date(),
      value: listItem.value,
      status: false,
      updated_at: null
    });
    listItem.value = "";
    showList();
  } else if(listItem.value == "") {
    alert('Item is required');
  }else {
    alert('Item is already exits or');
  }
}

function showList() {
  container.innerHTML = "";
  arrList.forEach(function({value, status},index) {
    console.log(arrList)
    var div =  document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "center";

    var displayItems = document.createElement('li');
    displayItems.innerHTML = value;
    div.appendChild(displayItems);

    var btnEdit = document.createElement("button");
    btnEdit.innerText = "Edit";
    div.appendChild(btnEdit);

    var btnDelete = document.createElement("button");
    btnDelete.innerText = "Delete";
    div.appendChild(btnDelete);

    btnDelete.addEventListener('click', function() {
      deleteItem(index);
    });

    btnEdit.addEventListener('click', function() {
      editItem(index);
    })

    container.appendChild(div);
  });
}

function editItem(indexValue) {
  var listItem = document.getElementById("additem");
  listItem.value = arrList[indexValue].value;

  btn.innerText = "Update";

  isUpdate = indexValue
  console.log('isUpdated',isUpdate)
}

function updateItem() {
  var oldValue = arrList[isUpdate];
  var listItem = document.getElementById("additem");
  oldValue.value = listItem.value;
  console.log('Update Value', oldValue)

  arrList.splice(isUpdate, 1, oldValue);

  listItem.value = "";
  showList();

  btn.innerText = "Add";

  isUpdate = null;
}

function deleteItem(indexValue) {
  arrList.splice(indexValue, 1);
  showList();
}