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

  // Data to send to Google Sheets via the Google Apps Script Web App
  const data = {
    'name': name,
    'date': date,
    'mainEvent': mainEventPoints,
    'weeklyMission': weeklyMissionPoints,
    'dailyGame': dailyGamePoints,
    'radio': radioPoints
  };

  // Replace with your correct Web App URL
  fetch('https://script.google.com/macros/s/AKfycbwLXvpItL8C5pEljBLV_VbwRUBEn5mT9hth2ZDsE9G7KRqXUodC7K4zRNHt2DHFr0I/exec', {
    method: 'POST',
    body: new URLSearchParams(data)
  })
  .then(response => response.text())
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Error:', error));
});
