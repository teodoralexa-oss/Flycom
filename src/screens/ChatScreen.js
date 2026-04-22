import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles } from '../styles/commonStyles';
import { COLORS } from '../styles/colors';

export default function ChatScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('chat');
  const [messageText, setMessageText] = useState('');

  const tabs = [
    { id: 'chat', label: 'Chat', icon: 'chatbubbles' },
    { id: 'embassies', label: 'Embassies', icon: 'flag' },
    { id: 'consulates', label: 'Consulates', icon: 'business' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.darkBg }}>
      {/* Top Info Bar */}
      <View style={commonStyles.topBar}>
        <Text style={commonStyles.topBarText}>Messages</Text>
        <Text style={commonStyles.topBarText}>{activeTab}</Text>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Ionicons 
              name={tab.icon} 
              size={20} 
              color={activeTab === tab.id ? COLORS.white : COLORS.gray} 
            />
            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Main Content Area */}
      <View style={{ flex: 1, padding: 16 }}>
        {activeTab === 'chat' && (
          <>
            <Text style={commonStyles.subtitle}>Main Chat</Text>
            <View style={[commonStyles.mapPlaceholder, { marginTop: 16, backgroundColor: COLORS.darkBg, borderColor: COLORS.white, borderWidth: 1, flex: 1 }]}>
              <Text style={[commonStyles.mapPlaceholderText, { color: COLORS.white }]}>
                Messages will appear here
              </Text>
            </View>
          </>
        )}
        
        {activeTab === 'embassies' && (
          <>
            <Text style={commonStyles.subtitle}>Embassies</Text>
            <View style={[commonStyles.listItem, { marginTop: 16 }]}>
              <Text style={commonStyles.listItemTitle}>US Embassy</Text>
              <Text style={commonStyles.listItemSub}>Strada Tudor Vladimirescu 4-6</Text>
            </View>
            <View style={[commonStyles.listItem, { marginTop: 8 }]}>
              <Text style={commonStyles.listItemTitle}>UK Embassy</Text>
              <Text style={commonStyles.listItemSub}>Strada Jules Michelet 9</Text>
            </View>
          </>
        )}
        
        {activeTab === 'consulates' && (
          <>
            <Text style={commonStyles.subtitle}>Consulates</Text>
            <View style={[commonStyles.listItem, { marginTop: 16 }]}>
              <Text style={commonStyles.listItemTitle}>French Consulate</Text>
              <Text style={commonStyles.listItemSub}>Bulevardul Primăverii 48</Text>
            </View>
            <View style={[commonStyles.listItem, { marginTop: 8 }]}>
              <Text style={commonStyles.listItemTitle}>German Consulate</Text>
              <Text style={commonStyles.listItemSub}>Șoseaua Nordului 7</Text>
            </View>
          </>
        )}
      </View>

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          placeholderTextColor={COLORS.gray}
          value={messageText}
          onChangeText={setMessageText}
          multiline
        />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={commonStyles.bottomNav}>
        <TouchableOpacity style={commonStyles.navButton} onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubbles" size={24} color={COLORS.white} />
          <Text style={commonStyles.navButtonText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.navButton} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={24} color={COLORS.white} />
          <Text style={commonStyles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.navButton} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings" size={24} color={COLORS.white} />
          <Text style={commonStyles.navButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryBlue,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: COLORS.darkBg,
  },
  tabText: {
    color: COLORS.gray,
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.primaryBlue,
  },
  textInput: {
    flex: 1,
    backgroundColor: COLORS.darkBg,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 80,
    color: COLORS.white,
    fontSize: 16,
    marginRight: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
};
