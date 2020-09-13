// Make window to top when open/refresh web
window.scrollTo({ top: 0, behavior: "smooth" });

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

// Function to get year dynamically for footer
document
  .getElementById("copyright")
  .appendChild(document.createTextNode(new Date().getFullYear()));
