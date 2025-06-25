// Function to map activity type to prefix
const getActivityPrefix = (type, name) => {
  if (name === 'Spotify') return 'Słucha';
  switch (type) {
    case 0: return 'W grze';
    case 1: return 'Streamuje';
    case 2: return 'Słucha';
    case 3: return 'Ogląda';
    case 4: return ''; // Custom status, no prefix
    case 5: return 'Rywalizuje w';
    default: return '';
  }
};

// Function to set default values on error
const setDefaultValues = () => {
  document.getElementById('avatar').src = 'assets/default-avatar.png';
  document.getElementById('status').src = 'assets/offline.png';
  document.getElementById('activity-type').textContent = 'Brak';
  document.getElementById('activity').innerHTML = '<p>Brak aktywności</p>';
};

// Fetch status from API
axios.get('http://helya.wisp.uno:12418/api/status')
  .then(response => {
    const data = response.data;

    // Set avatar
    document.getElementById('avatar').src = data.avatar || 'assets/default-avatar.png';

    // Set status image
    const statusImages = {
      offline: 'assets/offline.png',
      online: 'assets/online.png',
      idle: 'assets/idle.png',
      dnd: 'assets/dnd.gif'
    };
    document.getElementById('status').src = statusImages[data.status] || 'assets/offline.png';

    // Set activity type in bio
    const activityTypeElement = document.getElementById('activity-type');
    if (data.activity) {
      const activityPrefix = getActivityPrefix(data.activity.type, data.activity.name);
      activityTypeElement.textContent = activityPrefix && data.activity.name
  ? `${activityPrefix} ${data.activity.name}`
  : 'Brak';
    } else {
      activityTypeElement.textContent = 'Brak';
    }

    // Set activity details
    const activityElement = document.getElementById('activity');
    if (data.activity) {
      const isPlaying = data.activity.type === 0;
      const appTitleClass = isPlaying ? 'app-title-playing' : '';
      activityElement.innerHTML = `
        <div class="activity-box">
          ${data.activity.largeImage ? `<img src="${data.activity.largeImage}" alt="Activity Icon" class="activity-icon" loading="lazy">` : ''}
          <div class="activity-details">
            <strong class="${appTitleClass}">${data.activity.name || 'Brak'}</strong>
            ${data.activity.details ? `<p>${data.activity.details}</p>` : ''}
            ${data.activity.state ? `<p>${data.activity.state}</p>` : ''}
          </div>
        </div>
      `;
    } else {
      activityElement.innerHTML = '<p>Brak aktywności</p>';
    }
  })
  .catch(error => {
    console.error('Błąd pobierania statusu:', error);
    setDefaultValues();
  });