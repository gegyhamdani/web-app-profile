// Get notification section
var notification = document.getElementById("notification");

// Get content body section
var contentBody = document.getElementById("content-body");

// Get the button that close the notification
var notificationButton = document.getElementById("notification-button");

// Function that hide the notification
const handleHideNotification = () => {
  notification.classList.add("notification-inActive");
  contentBody.classList.add("content-body-full");
};

// Event to call hide notification function
notificationButton.addEventListener("click", handleHideNotification);

// Get newsletter section
var newsletter = document.getElementById("newsletter");

// Get the button that close the newsletter
var newsletterButton = document.getElementById("newsletter-button");

// Variable to check if the newsletter is opened or not
var isNewsletterOpened = false;

// Variable to get latest Date
var dateNow = new Date();

// Function for handling Newsletter when Scrolling
// When there is no data in Local Storage, if user scroll after 1/3 page
// Newsletter will shown. If Newsletter has been closed
// and the gap between the last closed newsletter and the current time is 10 minutes,
// the newsletter will be displayed again
const handleScrollNewsletter = () => {
  var getLocalStorageVariable = JSON.parse(localStorage.getItem("storedData"));

  var windowHeight = window.innerHeight;
  var y = window.scrollY;
  var windowThreshold = windowHeight * 0.33;

  // Check if local storage available
  if (getLocalStorageVariable !== null) {
    var storageDate = new Date(getLocalStorageVariable.dateNow);
    var diff = dateNow.getTime() - storageDate.getTime();
    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;

    // Check if the date in storage is more than 10 minutes from the current date, and if
    // User has been scroll more than window threshold (which is 1/3 of the page height)
    // And if isNewsletterOpened variable on local storage is false
    if (
      mm > 10 &&
      y > windowThreshold &&
      !getLocalStorageVariable.isNewsletterOpened
    ) {
      console.log({ data: getLocalStorageVariable.isNewsletterOpened });
      isNewsletterOpened = true;
      newsletter.classList.add("newsletter-active");
      localStorage.removeItem("storedData");
    }
  } else if (y > windowThreshold && !isNewsletterOpened) {
    isNewsletterOpened = true;
    newsletter.classList.add("newsletter-active");
  }
};

// Function for handling close newsletter
// Will store the date when this function was called and store the variable isNewsLetterOption
// Into local storage
const handleCloseNewsletter = () => {
  if (isNewsletterOpened) {
    isNewsletterOpened = false;
    newsletter.classList.remove("newsletter-active");
    var localStorageVariable = { isNewsletterOpened, dateNow };
    localStorage.setItem("storedData", JSON.stringify(localStorageVariable));
  }
};

// Event for handling Newsletter when window is scrolling
window.addEventListener("scroll", handleScrollNewsletter);

// Event for handling Newsletter close button
newsletterButton.addEventListener("click", handleCloseNewsletter);

// Function to get year dynamically for footer
document
  .getElementById("copyright")
  .appendChild(document.createTextNode(new Date().getFullYear()));
