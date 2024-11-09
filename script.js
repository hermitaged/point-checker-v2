document.getElementById('points-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form data
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const mainEventPoints = document.getElementById('main-event').value;
  const weeklyMissionPoints = document.getElementById('weekly-mission').value;
  const dailyGamePoints = document.getElementById('daily-game').value;
  const radioPoints = document.getElementById('radio').value;

  // Calculate total points
  const totalPoints = parseInt(mainEventPoints) + parseInt(weeklyMissionPoints) +
                      parseInt(dailyGamePoints) + parseInt(radioPoints);

  const responseMessage = `Thank you, ${name}. You have earned a total of ${totalPoints} points on ${date}.`;

  // Display a success message
  document.getElementById('form-response').textContent = responseMessage;

  // Create data to send to Google Sheets
  const data = {
    'name': name,
    'date': date,
    'mainEvent': mainEventPoints,
    'weeklyMission': weeklyMissionPoints,
    'dailyGame': dailyGamePoints,
    'radio': radioPoints
  };

  // Send the form data to Google Apps Script web app (replace with your URL)
  fetch('YOUR_WEB_APP_URL_HERE', {
    method: 'POST',
    body: new URLSearchParams(data)
  })
  .then(response => response.text())
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Error:', error));
});
