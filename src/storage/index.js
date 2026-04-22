// Storage layer entry point for persistence logic.
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  MESSAGES: 'flycom:messages',
  REFERENCE_POINTS: 'flycom:referencePoints',
  SOS_ALERTS: 'flycom:sosAlerts',
  SETTINGS: 'flycom:settings',
  USERS: 'flycom:users',
};

export async function saveMessages(messages) {
  await AsyncStorage.setItem(KEYS.MESSAGES, JSON.stringify(messages));
}

export async function loadMessages() {
  const raw = await AsyncStorage.getItem(KEYS.MESSAGES);
  return raw ? JSON.parse(raw) : [];
}

export async function addMessage(message) {
  const messages = await loadMessages();
  messages.push({ ...message, id: Date.now().toString(), timestamp: new Date().toISOString() });
  await saveMessages(messages);
  return message;
}

export async function saveReferencePoints(points) {
  await AsyncStorage.setItem(KEYS.REFERENCE_POINTS, JSON.stringify(points));
}

export async function loadReferencePoints() {
  const raw = await AsyncStorage.getItem(KEYS.REFERENCE_POINTS);
  return raw ? JSON.parse(raw) : [];
}

export async function addReferencePoint(point) {
  const points = await loadReferencePoints();
  points.push({ ...point, id: Date.now().toString(), timestamp: new Date().toISOString() });
  await saveReferencePoints(points);
  return point;
}

export async function saveSOSAlerts(alerts) {
  await AsyncStorage.setItem(KEYS.SOS_ALERTS, JSON.stringify(alerts));
}

export async function loadSOSAlerts() {
  const raw = await AsyncStorage.getItem(KEYS.SOS_ALERTS);
  return raw ? JSON.parse(raw) : [];
}

export async function addSOSAlert(alert) {
  const alerts = await loadSOSAlerts();
  alerts.push({ ...alert, id: Date.now().toString(), timestamp: new Date().toISOString() });
  await saveSOSAlerts(alerts);
  return alert;
}

export async function saveSettings(settings) {
  await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
}

export async function loadSettings() {
  const raw = await AsyncStorage.getItem(KEYS.SETTINGS);
  return raw ? JSON.parse(raw) : {
    notificationsEnabled: true,
    locationSharing: true,
    darkMode: true,
    accessibilityMode: 'Standard',
    announcements: 'All',
  };
}

export async function updateSetting(key, value) {
  const settings = await loadSettings();
  settings[key] = value;
  await saveSettings(settings);
  return settings;
}

export async function loadUsers() {
  const raw = await AsyncStorage.getItem(KEYS.USERS);
  return raw ? JSON.parse(raw) : [];
}

export async function saveUsers(users) {
  await AsyncStorage.setItem(KEYS.USERS, JSON.stringify(users));
}
