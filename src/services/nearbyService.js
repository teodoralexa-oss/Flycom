const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const POSSIBLE_NAMES = ['Alex', 'Mia', 'Noah', 'Luca', 'Sara', 'Ivy', 'Daria'];

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

export function generateNearbyUsers(baseCoords) {
  const count = randomInt(3, 5);
  const users = [];

  for (let i = 0; i < count; i += 1) {
    const useName = Math.random() > 0.4;
    users.push({
      id: generateId(),
      name: useName ? POSSIBLE_NAMES[randomInt(0, POSSIBLE_NAMES.length - 1)] : '',
      latitude: baseCoords.latitude + randomOffset(),
      longitude: baseCoords.longitude + randomOffset(),
    });
  }

  return users;
}
