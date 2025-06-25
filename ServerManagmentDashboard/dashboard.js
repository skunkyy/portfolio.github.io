// Data
const servers = [
  {
    id: 1,
    name: 'Survival Server',
    status: 'online',
    players: 24,
    maxPlayers: 50,
    uptime: '15d 3h 42m',
    version: '1.20.4',
    tps: 19.8,
    ram: { used: 6.2, total: 8 },
    cpu: 45
  },
  {
    id: 2,
    name: 'Creative Build',
    status: 'online',
    players: 8,
    maxPlayers: 30,
    uptime: '2d 12h 15m',
    version: '1.20.4',
    tps: 20.0,
    ram: { used: 3.1, total: 4 },
    cpu: 22
  },
  {
    id: 3,
    name: 'PvP Arena',
    status: 'maintenance',
    players: 0,
    maxPlayers: 40,
    uptime: '0m',
    version: '1.20.4',
    tps: 0,
    ram: { used: 0, total: 6 },
    cpu: 0
  }
];

const onlinePlayers = [
  { name: 'Steve_Builder', server: 'Survival Server', playtime: '5h 23m', status: 'online' },
  { name: 'AlexCrafter', server: 'Creative Build', playtime: '2h 45m', status: 'online' },
  { name: 'DiamondMiner', server: 'Survival Server', playtime: '8h 12m', status: 'online' },
  { name: 'RedstoneGuru', server: 'Creative Build', playtime: '1h 30m', status: 'online' },
  { name: 'PvPMaster', server: 'Survival Server', playtime: '3h 55m', status: 'online' }
];

const consoleOutput = [
  '[15:42:33] [INFO] Steve_Builder joined the game',
  '[15:41:22] [INFO] Server backup completed successfully',
  '[15:40:15] [WARN] Player AlexCrafter tried to use restricted command',
  '[15:39:45] [INFO] DiamondMiner left the game',
  '[15:38:30] [INFO] Automatic restart scheduled for 03:00 AM'
];

// Utility Functions
function getStatusColor(status) {
  switch (status) {
    case 'online': return 'text-green-400 bg-green-400-20';
    case 'offline': return 'text-red-400 bg-red-400-20';
    case 'maintenance': return 'text-yellow-400 bg-yellow-400-20';
    default: return 'text-gray-400 bg-gray-400-20';
  }
}

function getStatusIcon(status) {
  switch (status) {
    case 'online': return '✅';
    case 'offline': return '❌';
    case 'maintenance': return '⚠️';
    default: return '🖥️';
  }
}

// Render Server Cards
function renderServerCards() {
  const serverGrid = document.querySelector('.server-grid');
  serverGrid.innerHTML = '';
  servers.forEach(server => {
    const card = document.createElement('div');
    card.className = 'server-card';
    card.innerHTML = `
      <div class="server-header">
        <div class="server-status">
          <div class="status-icon ${getStatusColor(server.status)}">${getStatusIcon(server.status)}</div>
          <div>
            <h3 class="text-lg font-semibold text-white">${server.name}</h3>
            <p class="text-sm ${getStatusColor(server.status)} capitalize">${server.status}</p>
          </div>
        </div>
        <div class="flex space-x-2">
          <button class="action-button text-green-400 bg-green-400-20 hover:bg-green-400-30">▶</button>
          <button class="action-button text-yellow-400 bg-yellow-400-20 hover:bg-yellow-400-30">⏸️</button>
          <button class="action-button text-red-400 bg-red-400-20 hover:bg-red-400-30">↻</button>
        </div>
      </div>
      <div class="server-metrics">
        <div class="metric-box">
          <p class="text-xl font-bold text-white">${server.players}/${server.maxPlayers}</p>
          <p class="text-xs text-gray-400">Gracze</p>
        </div>
        <div class="metric-box">
          <p class="text-xl font-bold text-white">${server.tps}</p>
          <p class="text-xs text-gray-400">TPS</p>
        </div>
      </div>
      <div class="space-y-3">
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-400">RAM</span>
            <span class="text-white">${server.ram.used}GB / ${server.ram.total}GB</span>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-fill bg-blue-400" style="width: ${(server.ram.used / server.ram.total) * 100}%"></div>
          </div>
        </div>
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-400">CPU</span>
            <span class="text-white">${server.cpu}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-fill bg-green-400" style="width: ${server.cpu}%"></div>
          </div>
        </div>
        <div class="server-footer">
          <span class="text-sm text-gray-400">Uptime: ${server.uptime}</span>
          <span class="text-sm text-gray-400">v${server.version}</span>
        </div>
      </div>
    `;
    serverGrid.appendChild(card);
  });
}

// Render Player Table
function renderPlayerTable() {
  const playerTable = document.querySelector('#player-table');
  const playerCount = document.querySelector('#player-count');
  playerCount.textContent = onlinePlayers.length;
  playerTable.innerHTML = '';
  onlinePlayers.forEach(player => {
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-700-30 transition-colors';
    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
          <div class="player-avatar">
            <span class="text-sm font-bold text-white">${player.name[0]}</span>
          </div>
          <span class="text-white font-medium">${player.name}</span>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-gray-300">${player.server}</td>
      <td class="px-6 py-4 whitespace-nowrap text-gray-300">${player.playtime}</td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="status-badge bg-green-400-20 text-green-400">Online</span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex space-x-2">
          <button class="p-1 text-blue-400 hover:text-blue-300 transition-colors">💬</button>
          <button class="p-1 text-yellow-400 hover:text-yellow-300 transition-colors">✔️</button>
          <button class="p-1 text-red-400 hover:text-red-300 transition-colors">❌</button>
        </div>
      </td>
    `;
    playerTable.appendChild(row);
  });
}

// Render Console Output
function renderConsoleOutput() {
  const consoleOutputDiv = document.querySelector('#console-output');
  consoleOutputDiv.innerHTML = '';
  consoleOutput.forEach(line => {
    const div = document.createElement('div');
    div.className = 'text-green-400 mb-1 console-line px-2 py-1 rounded';
    div.textContent = line;
    consoleOutputDiv.appendChild(div);
  });
}

// Tab Navigation
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    const tab = button.dataset.tab;
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
    document.querySelector(`#${tab}`).classList.remove('hidden');
  });
});

// Console Input Handling
document.querySelector('#console-submit').addEventListener('click', () => {
  const input = document.querySelector('#console-input');
  if (input.value.trim()) {
    consoleOutput.push(`[${new Date().toLocaleTimeString()}] [INFO] Command executed: ${input.value}`);
    renderConsoleOutput();
    input.value = '';
  }
});

// Initialize
renderServerCards();
renderPlayerTable();
renderConsoleOutput();