const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const POSSIBLE_NAMES = ['Alex', 'Mia', 'Noah', 'Luca', 'Sara', 'Ivy', 'Daria', 'Tom', 'Emma', 'Leo'];
const CONNECTION_STATUSES = ['connected', 'connecting', 'available'];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomOffset() {
  return (Math.random() - 0.5) * 0.01;
}

function generateId() {
  let suffix = '';
  for (let i = 0; i < 4; i += 1) {
    suffix += CHARSET[randomInt(0, CHARSET.length - 1)];
  }
  return `FLY-${suffix}`;
}

function getRandomStatus() {
  return CONNECTION_STATUSES[randomInt(0, CONNECTION_STATUSES.length - 1)];
}

export function generateNearbyUsers(baseCoords) {
  const count = randomInt(3, 5);
  const users = [];

  for (let i = 0; i < count; i += 1) {
    const useName = Math.random() > 0.3;
    const status = getRandomStatus();
    users.push({
      id: generateId(),
      name: useName ? POSSIBLE_NAMES[randomInt(0, POSSIBLE_NAMES.length - 1)] : '',
      latitude: baseCoords.latitude + randomOffset(),
      longitude: baseCoords.longitude + randomOffset(),
      status: status,
    });
  }

  return users;
}
