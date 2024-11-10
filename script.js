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

  // Create data object to send
  const data = {
    'name': name,
    'date': date,
    'mainEvent': mainEventPoints,
    'weeklyMission': weeklyMissionPoints,
    'dailyGame': dailyGamePoints,
    'radio': radioPoints,
    'totalPoints': totalPoints // Include totalPoints in data sent to server
  };

  console.log(data);  // Log the data to verify it's correct

  // Send form data to Google Apps Script Web App
  fetch('https://script.google.com/macros/s/AKfycbx4TZuTtqImHRCMp1r1MfMi-xO-wgIo_AVKREhmw5Bg5D4WLGla7mzQuDtD_238Zean/exec', {
    method: 'POST',
    body: new URLSearchParams(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(response => response.text())
  .then(result => {
    console.log(result);  // Log the result from the Google Apps Script
    const responseMessage = `Thank you, ${name}. You have earned a total of ${totalPoints} points on ${date}.`;

    // Display the thank-you message and trigger the fade-in effect
    const formResponseElement = document.getElementById('form-response');
    formResponseElement.textContent = responseMessage;

    // Make the response container visible and trigger the fade-in effect
    formResponseElement.style.display = 'block';  // Make the container visible
    setTimeout(() => {
      formResponseElement.style.opacity = 1;  // Fade-in effect
    }, 10);  // Small delay to trigger opacity change

    // Clear each form field explicitly
    document.getElementById('name').value = "";
    document.getElementById('date').value = "";
    document.getElementById('main-event').value = "";
    document.getElementById('weekly-mission').value = "";
    document.getElementById('daily-game').value = "";
    document.getElementById('radio').value = "";

  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('form-response').textContent = "Submission failed. Please try again.";
  });
});
