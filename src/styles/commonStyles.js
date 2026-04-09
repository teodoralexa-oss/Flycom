import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.black,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 12,
  },
  input: {
    width: '100%',
    maxWidth: 260,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    color: COLORS.black,
  },
  button: {
    backgroundColor: COLORS.blue,
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
});
