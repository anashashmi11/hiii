// Function to create a new invitation card
function createInvitation() {
    
    const eventDate = document.getElementById('eventDate').value;
    const eventLocation = document.getElementById('eventLocation').value;
    const guestName = document.getElementById('guestName').value;
    const contactNumber = document.getElementById('contactNumber').value;

    // Check if all fields are filled
    if ( !eventDate || !eventLocation || !guestName || !contactNumber) {
        alert('Please fill in all the fields.');
        return;
    }

    // Create an invitation card object
    const invitation = {
       
        eventDate: eventDate,
        eventLocation: eventLocation,
        guestName: guestName,
        contactNumber: contactNumber
    };

    // Get existing invitations from localStorage
    let invitations = JSON.parse(localStorage.getItem('invitations')) || [];

    // Add the new invitation to the list
    invitations.push(invitation);

    // Save the updated list of invitations back to localStorage
    localStorage.setItem('invitations', JSON.stringify(invitations));

    // Create and display the new card
    displayInvitationCard(invitation);
}

// Function to display the invitation card
function displayInvitationCard(invitation) {
    const card = document.createElement('div');
    card.className = 'invitation-card';
    card.innerHTML = `
        
        <p><strong>Date:</strong> ${invitation.eventDate}</p>
        <p><strong>Location:</strong> ${invitation.eventLocation}</p>
        <p><strong>Guest:</strong> ${invitation.guestName}</p>
        <button onclick="sendWhatsApp('${invitation.guestName}', '${invitation.eventDate}', '${invitation.eventLocation}', '${invitation.contactNumber}')">Send via WhatsApp</button>
        <button onclick="deleteInvitation('${invitation.guestName}')">Delete Invitation</button>
    `;

    // Append the new invitation card to the container
    document.getElementById('invitationContainer').appendChild(card);

    // Apply styles to the card
    $(card).css({
        'border': '1px solid #ddd',
        'padding': '15px',
        'width': '350px',
        'margin': '10px 0',
        'border-radius': '8px',
        'box-shadow': '0 4px 8px rgba(0, 0, 0, 0.1)'
    });

    // Style the buttons inside the card
    $(card).find('button').css({
        'margin-top': '10px',
        'padding': '8px',
        'background-color': '#25D366', // WhatsApp color
        'color': 'white',
        'border': 'none',
        'cursor': 'pointer',
        'border-radius': '5px'
    });

    $(card).find('button').hover(function() {
        $(this).css('background-color', '#128C7E');
    }, function() {
        $(this).css('background-color', '#25D366');
    });
}

// Function to send the invitation via WhatsApp
function sendWhatsApp(guestName, eventType, eventDate, eventLocation, contactNumber) {
    const message = `Hi, ${guestName}! You're invited to a ${eventType} event on ${eventDate} at ${eventLocation}.`;
    const whatsappURL = `https://wa.me/${contactNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// Function to load all invitations and display them
function loadInvitations() {
    const invitations = JSON.parse(localStorage.getItem('invitations')) || [];
    invitations.forEach(displayInvitationCard);
}

// Function to delete an invitation
function deleteInvitation(guestName) {
    // Get the current invitations from localStorage
    let invitations = JSON.parse(localStorage.getItem('invitations')) || [];
    
    // Remove the invitation with the matching guestName
    invitations = invitations.filter(invitation => invitation.guestName !== guestName);
    
    // Save the updated list of invitations back to localStorage
    localStorage.setItem('invitations', JSON.stringify(invitations));
    
    // Reload the page to reflect changes (optional)
    document.getElementById('invitationContainer').innerHTML = ''; // Clear the container
    loadInvitations(); // Re-load invitations after deletion
}

// Call the load function if on the "View Invitations" page
if (document.getElementById('invitationContainer')) {
    loadInvitations();
}
