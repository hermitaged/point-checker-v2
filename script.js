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

  // Show thank-you message after submission
  const thankYouMessage = document.createElement('div');
  thankYouMessage.classList.add('thank-you-message');
  thankYouMessage.innerHTML = `Thank you, ${name}. You have earned a total of ${totalPoints} points on ${date}.`;
  document.body.appendChild(thankYouMessage);

  // Fade-out effect for the message after 5 seconds
  setTimeout(() => {
    thankYouMessage.style.opacity = 0;
    setTimeout(() => thankYouMessage.remove(), 500); // Remove after fade-out
  }, 5000);

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
    alert("Submission failed. Please try again.");
  });

  // Clear form fields after submission (Reset animation effects)
  setTimeout(() => {
    document.getElementById('name').value = "";
    document.getElementById('date').value = "";
    document.getElementById('main-event').value = "";
    document.getElementById('weekly-mission').value = "";
    document.getElementById('daily-game').value = "";
    document.getElementById('radio').value = "";

    // Optionally, remove focus from all inputs to reset styles
    document.getElementById('name').blur();
    document.getElementById('date').blur();
    document.getElementById('main-event').blur();
    document.getElementById('weekly-mission').blur();
    document.getElementById('daily-game').blur();
    document.getElementById('radio').blur();
  }, 500); // Small delay to allow animations to finish before clearing

});
