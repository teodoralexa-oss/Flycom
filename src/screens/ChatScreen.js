import { Text, TouchableOpacity, View, TextInput, FlatList, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles } from '../styles/commonStyles';
import { COLORS } from '../styles/colors';
import { useAppContext } from '../context/AppContext';
import { addMessage, loadMessages } from '../storage';

export default function ChatScreen({ navigation }) {
  const { user } = useAppContext();
  const [activeTab, setActiveTab] = useState('chat');
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const tabs = [
    { id: 'chat', label: 'Chat', icon: 'chatbubbles' },
    { id: 'embassies', label: 'Embassies', icon: 'flag' },
    { id: 'consulates', label: 'Consulates', icon: 'business' },
  ];

  const embassyChannels = [
    { id: 'us-embassy', name: 'US Embassy', location: 'Strada Tudor Vladimirescu 4-6' },
    { id: 'uk-embassy', name: 'UK Embassy', location: 'Strada Jules Michelet 9' },
  ];

  const consulateChannels = [
    { id: 'fr-consulate', name: 'French Consulate', location: 'Bulevardul Primăverii 48' },
    { id: 'de-consulate', name: 'German Consulate', location: 'Șoseaua Nordului 7' },
  ];

  useEffect(() => {
    loadMessages().then(setMessages);
  }, []);

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;

    const isOfficialChannel = activeTab === 'embassies' || activeTab === 'consulates';
    
    if (isOfficialChannel && !selectedChannel) {
      Alert.alert('Select Channel', 'Please select a channel first');
      return;
    }

    const isOfficial = user?.username?.startsWith('OFFICIAL_') || false;
    
    if (isOfficialChannel && !isOfficial) {
      Alert.alert(
        'Access Denied',
        'Only embassy/consulate officials can post in these channels. You can read messages but cannot send.',
        [{ text: 'OK' }]
      );
      return;
    }

    const message = {
      text: messageText,
      senderId: user?.id,
      senderName: user?.username || user?.id,
      channel: selectedChannel || 'main-chat',
      channelType: activeTab,
      isOfficial,
    };

    await addMessage(message);
    const updated = await loadMessages();
    setMessages(updated);
    setMessageText('');

    Alert.alert('Message Sent', 'Your message has been broadcast to the mesh network');
  };

  const filteredMessages = messages.filter(msg => {
    if (activeTab === 'chat') return msg.channelType === 'chat';
    if (activeTab === 'embassies') {
      if (!selectedChannel) return false;
      return msg.channel === selectedChannel && msg.channelType === 'embassies';
    }
    if (activeTab === 'consulates') {
      if (!selectedChannel) return false;
      return msg.channel === selectedChannel && msg.channelType === 'consulates';
    }
    return true;
  });

  const renderMessage = ({ item }) => (
    <View style={[styles.messageBubble, item.isOfficial ? styles.officialMessage : styles.userMessage]}>
      <Text style={styles.messageSender}>{item.senderName}</Text>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
    </View>
  );

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
            onPress={() => {
              setActiveTab(tab.id);
              setSelectedChannel(null);
            }}
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

      {/* Channel Selection for Embassies/Consulates */}
      {(activeTab === 'embassies' || activeTab === 'consulates') && !selectedChannel && (
        <View style={{ padding: 16 }}>
          <Text style={commonStyles.subtitle}>Select Channel</Text>
          <Text style={{ color: COLORS.gray, fontSize: 12, marginBottom: 12 }}>
            {activeTab === 'embassies' ? 'Embassy channels - Officials only can post' : 'Consulate channels - Officials only can post'}
          </Text>
          {(activeTab === 'embassies' ? embassyChannels : consulateChannels).map((channel) => (
            <TouchableOpacity
              key={channel.id}
              style={[commonStyles.listItem, { marginTop: 8 }]}
              onPress={() => setSelectedChannel(channel.id)}
            >
              <Text style={commonStyles.listItemTitle}>{channel.name}</Text>
              <Text style={commonStyles.listItemSub}>{channel.location}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[commonStyles.listItem, { marginTop: 8, backgroundColor: COLORS.darkBg }]}
            onPress={() => setActiveTab('chat')}
          >
            <Text style={[commonStyles.listItemTitle, { color: COLORS.primaryBlue }]}>Back to Chat</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Messages List */}
      {(activeTab === 'chat' || selectedChannel) && (
        <>
          <View style={{ flex: 1, paddingHorizontal: 16 }}>
            {selectedChannel && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <TouchableOpacity onPress={() => setSelectedChannel(null)}>
                  <Ionicons name="arrow-back" size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={[commonStyles.subtitle, { marginLeft: 8, flex: 1 }]}>
                  {(activeTab === 'embassies' ? embassyChannels : consulateChannels).find(c => c.id === selectedChannel)?.name}
                </Text>
              </View>
            )}
            
            {filteredMessages.length === 0 ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: COLORS.gray }}>No messages yet</Text>
              </View>
            ) : (
              <FlatList
                data={filteredMessages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                inverted={false}
              />
            )}
          </View>

          {/* Message Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={selectedChannel ? "Type a message..." : "Peer-to-peer chat..."}
              placeholderTextColor={COLORS.gray}
              value={messageText}
              onChangeText={setMessageText}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Ionicons name="send" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </>
      )}

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
  messageBubble: {
    padding: 12,
    borderRadius: 12,
    marginVertical: 4,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: COLORS.primaryBlue,
    alignSelf: 'flex-end',
  },
  officialMessage: {
    backgroundColor: COLORS.green,
    alignSelf: 'flex-start',
  },
  messageSender: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  messageText: {
    color: COLORS.white,
    fontSize: 14,
  },
  messageTime: {
    color: COLORS.gray,
    fontSize: 10,
    marginTop: 4,
    textAlign: 'right',
  },
};
