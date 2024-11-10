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
    'radio': radioPoints
  };

  // Send form data to Google Apps Script Web App
  fetch('https://script.google.com/macros/s/AKfycbzPcNthP9TkYTAd8z0n-YQQfPIcdVDHa49VkMNBd76Etcr618JRCTk-NyoKBmHY4TvA/exec', {
    method: 'POST',
    body: new URLSearchParams(data)
  })
  .then(response => response.text())
  .then(result => {
    // Display success message with total points
    const responseMessage = `Thank you, ${name}. You have earned a total of ${totalPoints} points on ${date}.`;
    document.getElementById('form-response').textContent = responseMessage;
    console.log('Success:', result);
  })
  .catch(error => {
    console.error('Error:', error);
    // Display persistent failure message
    document.getElementById('form-response').textContent = "Submission failed. Please try again.";
  });
});
