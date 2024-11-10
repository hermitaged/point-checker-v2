document.getElementById('points-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Form field values
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const chainfallPoints = document.getElementById('chainfall').value || 0;  // Changed from 'main-event'
  const chronofluxPoints = document.getElementById('chronoflux').value || 0;  // Changed from 'weekly-mission'
  const nebulightPoints = document.getElementById('nebulight').value || 0;  // Changed from 'daily-game'
  const voxaraPoints = document.getElementById('voxara').value || 0;  // Changed from 'radio'

  // Date validation to ensure it is in 2025
  const selectedDate = new Date(date);
  if (selectedDate.getFullYear() !== 2025) {
    alert("Please select a date in 2025.");
    return;
  }

  // Calculate total points (optional fields can be blank)
  const totalPoints = (parseInt(chainfallPoints) || 0) + 
                      (parseInt(chronofluxPoints) || 0) + 
                      (parseInt(nebulightPoints) || 0) + 
                      (parseInt(voxaraPoints) || 0);

  // Show thank-you alert after submission
  alert(`Thank you, ${name}. You have earned a total of ${totalPoints} points on ${date}.`);

  // Send form data to Google Apps Script Web App
  fetch('https://script.google.com/macros/s/AKfycbx1kr_OoNSh5YwpXpGgcPD8QQ0HwZ967CtzHQ6F94BUxGQaEcPQrWcBidkwdH42og/exec', {
    method: 'POST',
    body: new URLSearchParams({
      'name': name,
      'date': date,
      'chainfall': chainfallPoints,  // Changed from 'mainEvent'
      'chronoflux': chronofluxPoints,  // Changed from 'weeklyMission'
      'nebulight': nebulightPoints,  // Changed from 'dailyGame'
      'voxara': voxaraPoints,  // Changed from 'radio'
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
    alert("Submission failed. Please try again.");
  });

  // Clear form fields after submission
  document.getElementById('name').value = "";
  document.getElementById('date').value = "";
  document.getElementById('chainfall').value = "";
  document.getElementById('chronoflux').value = "";
  document.getElementById('nebulight').value = "";
  document.getElementById('voxara').value = "";
});
