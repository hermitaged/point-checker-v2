document.getElementById('points-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Form field values
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const mainEventPoints = document.getElementById('main-event').value || 0;
  const weeklyMissionPoints = document.getElementById('weekly-mission').value || 0;
  const dailyGamePoints = document.getElementById('daily-game').value || 0;
  const radioPoints = document.getElementById('radio').value || 0;

  // Date validation to ensure it is in 2025
  const selectedDate = new Date(date);
  if (selectedDate.getFullYear() !== 2025) {
    alert("Please select a date in 2025.");
    return;
  }

  // Calculate total points (optional fields can be blank)
  const totalPoints = (parseInt(mainEventPoints) || 0) + 
                      (parseInt(weeklyMissionPoints) || 0) + 
                      (parseInt(dailyGamePoints) || 0) + 
                      (parseInt(radioPoints) || 0);

  // Display the thank-you message immediately
  const responseMessage = `Thank you, ${name}. You have earned a total of ${totalPoints} points on ${date}.`;
  const formResponseElement = document.getElementById('form-response');
  formResponseElement.textContent = responseMessage;
  formResponseElement.style.display = 'block';  // Make the message visible

  // Log the message to verify it's shown correctly
  console.log('Form submitted:', responseMessage);

  // Send form data to Google Apps Script Web App
  fetch('https://script.google.com/macros/s/AKfycbx4TZuTtqImHRCMp1r1MfMi-xO-wgIo_AVKREhmw5Bg5D4WLGla7mzQuDtD_238Zean/exec', {
    method: 'POST',
    body: new URLSearchParams({
      'name': name,
      'date': date,
      'mainEvent': mainEventPoints,
      'weeklyMission': weeklyMissionPoints,
      'dailyGame': dailyGamePoints,
      'radio': radioPoints,
      'totalPoints': totalPoints
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(response => response.text())
  .then(result => {
    console.log('Result from Google Apps Script:', result);  // Log the result from the Google Apps Script
  })
  .catch(error => {
    console.error('Error:', error);
    const formResponseElement = document.getElementById('form-response');
    formResponseElement.textContent = "Submission failed. Please try again.";
    formResponseElement.style.display = 'block'; // Display error message
  });

  // Clear form fields after submission
  document.getElementById('name').value = "";
  document.getElementById('date').value = "";
  document.getElementById('main-event').value = "";
  document.getElementById('weekly-mission').value = "";
  document.getElementById('daily-game').value = "";
  document.getElementById('radio').value = "";
});
