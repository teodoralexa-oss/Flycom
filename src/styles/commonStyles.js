import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.darkBg,
    padding: 16,
  },
  listScreen: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.white,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 12,
  },
  input: {
    width: '100%',
    maxWidth: 260,
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    color: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.primaryBlue,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 180,
    marginVertical: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  listItem: {
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
  },
  listItemTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  listItemSub: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 4,
  },
  // Top info bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.primaryBlue,
  },
  topBarText: {
    color: COLORS.white,
    fontSize: 14,
  },
  // Map placeholder
  mapPlaceholder: {
    flex: 1,
    backgroundColor: COLORS.gray,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderText: {
    color: COLORS.black,
    fontSize: 16,
  },
  // Bottom navigation
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlue,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  navButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  navButtonText: {
    color: COLORS.white,
    fontSize: 14,
    marginTop: 4,
  },
  // Floating buttons container
  floatingButtons: {
    position: 'absolute',
    right: 16,
    bottom: 80,
    alignItems: 'center',
  },
  // SOS button (circular, red)
  sosButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  sosButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  // Call Drone button
  callDroneButton: {
    backgroundColor: COLORS.primaryBlue,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
  },
  callDroneButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  // Section styles
  sectionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
});
