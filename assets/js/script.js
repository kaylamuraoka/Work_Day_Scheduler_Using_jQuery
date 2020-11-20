// Get the current date and time, in the format: Day name, Month, Day of month with ordinal.
$("#currentDay").text(moment().local().format("dddd, MMMM Do"));

var eventsArray = [];
for (var i = 0; i < localStorage.length; i++) {
  eventsArray.push(localStorage.key(i));
}

// Create a for-loop to iterate through numbers 9 to 17.
for (var hourIterator = 9; hourIterator <= 17; hourIterator++) {
  // Inside the loop...

  // Create a variable named "timeBlock" equal to $("<div>").
  var timeBlock = $("<div>");

  // Give each "timeBlock" the following classes: "time-block" "row".
  timeBlock.addClass("time-block, row");

  // Give each "timeBlock" an attribute called "hour-block", with a value equal to "hour".
  timeBlock.attr("hour-block", hourIterator);

  // Append each "timeBlock" to the ".container" div.
  $(".container").append(timeBlock);

  // Give each "timeBlock" three columns: one to hold the respective hour, another to hold the events within the hour, and one to save the events of the hour.
  var hourColumn = $("<div>");
  var eventColumn = $("<div>");
  var saveEventColumn = $("<div>");

  // Give each column a class that sets the columns width using bootstrap grid layout.
  hourColumn.addClass("col-2");
  eventColumn.addClass("col-9");
  saveEventColumn.addClass("col-1");

  // Append all 3 columns to the "timeBlock" div.
  timeBlock.append(hourColumn, eventColumn, saveEventColumn);

  // Give each "hourColumn" a "<h5>" text element equal to "hour".
  if (hourIterator < 12) {
    hourColumn.append(`<h5 class="hour">${hourIterator} AM</h5>`);
  } else if (hourIterator === 12) {
    hourColumn.append(`<h5 class="hour">${hourIterator} PM</h5>`);
  } else {
    // We must format hour so it is not in military time
    formattedHour = hourIterator - 12;
    hourColumn.append(`<h5 class="hour">${formattedHour} PM</h5>`);
  }

  // Give each "eventColumn" an "<input>" element where users can fill in events for the hour.
  // Create a variable named "eventDescription" equal to $("<input>").
  var eventDescription = $("<input>");
  // Give each "eventDescription" the following class "description".
  eventDescription.addClass("description");
  // Give each "eventDescription" an attribute called "type", with a value equal to "text".
  eventDescription.attr("type", "text");

  // Get events from local Storage
  var savedEventDetails = localStorage.getItem(hourIterator);
  // if "savedEventDetails" is not null
  if (!(savedEventDetails === null)) {
    eventDescription.val(savedEventDetails);
  }

  // Append each "eventDescription" to the "eventColumn" div.
  eventColumn.append(eventDescription);

  // call function "changeEventColumnColors()" to change the background-color of the "eventColumn" respective to the current hour.
  changeEventColumnColors();

  // Give each "saveEventColumn" a "<button>" to save event information to localStorage.
  saveEventColumn.append(
    `<button class="saveBtn"><i class="fas fa-save"></i></button>`
  );
}

eventColumn.on("click", function () {});

// This function changes the background-color of the "eventColumn" respective to the current time by adding the class ".past", ".present" or ".future"
function changeEventColumnColors() {
  // Create a variable named "currentHour" equal to the current hour
  var currentHour = parseInt(moment().local().format("HH"));

  // Conditional statements to determine hour in relation to the "currentHour"
  if (hourIterator < currentHour) {
    // background color should be grey
    eventColumn.addClass("past");
  } else if (hourIterator === currentHour) {
    // background color should be red
    eventColumn.addClass("present");
  } else {
    // background color should be green
    eventColumn.addClass("future");
  }
}

// Create an "on-click" event attached to the ".saveBtn" class.
$(".saveBtn").on("click", function () {
  // Inside the on-click event...
  // Create a variable called "matchingEvent" and set the variable equal to the input.
  var matchingHour = $(this).parent().parent().attr("hour-block");
  var matchingEvent = $(this).parent().parent().find("input").val();
  addEvent(matchingHour, matchingEvent);
});

function addEvent(hour, event) {
  localStorage.setItem(hour, event);
}
