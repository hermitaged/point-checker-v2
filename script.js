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

        // Show the thank you message
        const responseElement = document.getElementById('form-response');
        responseElement.textContent = responseMessage;

        // Fade in the thank-you message
        responseElement.style.display = 'block';
        setTimeout(() => {
            responseElement.style.opacity = 1;
        }, 50); // Adding a slight delay to trigger the fade-in effect

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
