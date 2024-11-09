document.getElementById('points-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form data
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const mainEventPoints = document.getElementById('main-event-points').value;
  const weeklyMissionPoints = document.getElementById('weekly-mission-points').value;
  const dailyGamePoints = document.getElementById('daily-game-points').value;
  const radioPoints = document.getElementById('radio-points').value;

  // Calculate total points
  const totalPoints = parseInt(mainEventPoints) + parseInt(weeklyMissionPoints) +
                      parseInt(dailyGamePoints) + parseInt(radioPoints);

  const responseMessage = `Thank you, ${name}. You have earned a total of ${totalPoints} points on ${date}.`;

  // Display a success message
  document.getElementById('form-response').textContent = responseMessage;

  // Data to send to Google Sheets via the Google Apps Script Web App
  const data = {
    'name': name,
    'date': date,
    'mainEvent': mainEventPoints,
    'weeklyMission': weeklyMissionPoints,
    'dailyGame': dailyGamePoints,
    'radio': radioPoints
  };

  // Make sure you replace 'YOUR_WEB_APP_URL_HERE' with the URL you got from the Apps Script deployment
  fetch('https://script.google.com/macros/s/AKfycbwhu3q_RDN-TSoSFbX3tkKGKKniHvKsjgAtYYj0taZq_w5aP8wsna_3fiCuEMywzuVA/exec', {
    method: 'POST',
    body: new URLSearchParams(data)
  })
  .then(response => response.text())
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Error:', error));
});
