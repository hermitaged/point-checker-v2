document.getElementById('points-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const mainEventPoints = document.getElementById('main-event').value;
  const weeklyMissionPoints = document.getElementById('weekly-mission').value;
  const dailyGamePoints = document.getElementById('daily-game').value;
  const radioPoints = document.getElementById('radio').value;

  // Check if the date is in 2025
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

  const responseMessage = `Thank you, ${name}. You have earned a total of ${totalPoints} points on ${date}.`;

  // Display a success message
  document.getElementById('form-response').textContent = responseMessage;

  const data = {
    'name': name,
    'date': date,
    'mainEvent': mainEventPoints,
    'weeklyMission': weeklyMissionPoints,
    'dailyGame': dailyGamePoints,
    'radio': radioPoints
  };

  fetch('https://script.google.com/macros/s/AKfycby8kYnewtN4_TTv41uJO2QUMvzZcz-t1GoWFtiVw2RmguF8l3OI4UHb1MMaIWBj4bU1/exec', {
    method: 'POST',
    body: new URLSearchParams(data)
  })
  .then(response => response.text())
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Error:', error));
});
