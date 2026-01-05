import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Paper,
  InputBase,
  Divider,
  Button,
  Box,
  CircularProgress,
  Menu,
  MenuItem,
  ListItemIcon,
  useTheme,
} from '@mui/material';
import {
  ArrowBack,
  Phone,
  VideoCall,
  InfoOutlined,
  Send,
  Mood,
  AttachFile,
  Mic,
  MoreVert,
  Favorite,
} from '@mui/icons-material';
import styled from '@emotion/styled';
import { mockChats, mockUsers } from '../../../../mockData'; // Adjust path as necessary

// --- Styled Components ---

const ChatWindowContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundColor: theme.palette.background.default,
}));

const MessageList = styled(Box)({
  flexGrow: 1,
  overflowY: 'auto',
  padding: '10px 15px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  maxHeight: 'calc(100vh - 120px - 60px)', // Approx calculation (Header + Input Area)
});

const MessageBubble = styled(Paper)(({ theme, isSender }) => ({
  padding: '8px 12px',
  borderRadius: '20px',
  maxWidth: '70%',
  alignSelf: isSender ? 'flex-end' : 'flex-start',
  backgroundColor: isSender
    ? theme.palette.primary.main
    : theme.palette.mode === 'light'
    ? theme.palette.grey[200]
    : theme.palette.grey[800],
  color: isSender ? theme.palette.primary.contrastText : theme.palette.text.primary,
  wordWrap: 'break-word',
  boxShadow: 'none',
}));

const MessageTime = styled(Typography)(({ isSender }) => ({
  fontSize: '10px',
  marginTop: '2px',
  textAlign: isSender ? 'right' : 'left',
  color: 'gray',
}));

const InputArea = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '5px 10px',
  margin: '8px 10px',
  borderRadius: '25px',
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
}));

const InputField = styled(InputBase)({
  flexGrow: 1,
  padding: '8px 10px',
});

const SendButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const HeaderBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
  position: 'static',
}));

// --- Helper Functions/Mocks ---

const getRecipient = (chatId) => {
  const chat = mockChats.find(c => c.id === parseInt(chatId));
  if (!chat) return null;
  // Assuming current user is ID 1 (Me)
  const recipientId = chat.participants.find(id => id !== 1);
  return mockUsers.find(u => u.id === recipientId);
};

const getMessages = (chatId) => {
  const chat = mockChats.find(c => c.id === parseInt(chatId));
  return chat ? chat.messages : [];
};

// --- Main Component ---

const ChatWindow = ({ onClose }) => {
  const { chatId } = useParams();
  const theme = useTheme();
  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    const recipientData = getRecipient(chatId);
    const messageData = getMessages(chatId);

    setRecipient(recipientData);
    setMessages(messageData);
    setLoading(false);
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: Date.now(),
      senderId: 1, // Current user
      content: inputMessage,
      timestamp: new Date().toISOString(),
      type: 'text',
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');
  };

  const handleSendLike = () => {
    const newLike = {
      id: Date.now(),
      senderId: 1,
      content: '👍', // Or a custom Like icon/message
      timestamp: new Date().toISOString(),
      type: 'like',
    };

    setMessages((prev) => [...prev, newLike]);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  if (!recipient) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography color="textSecondary">Chat not found.</Typography>
      </Box>
    );
  }

  const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Determine if the send button should be the 'Send' icon or the 'Like' icon
  const isInputEmpty = inputMessage.trim() === '';

  return (
    <ChatWindowContainer>
      {/* Header */}
      <HeaderBar position="static" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            {/* Note: onClose is usually passed down for mobile view or dedicated app view */}
            {onClose && (
              <IconButton edge="start" color="inherit" onClick={onClose} sx={{ mr: 1 }}>
                <ArrowBack />
              </IconButton>
            )}
            <Avatar src={recipient.avatar} alt={recipient.name} sx={{ mr: 1 }} />
            <Box>
              <Typography variant="subtitle1" component="div" fontWeight="bold">
                {recipient.name}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Active now
              </Typography>
            </Box>
          </Box>
          <Box>
            <IconButton color="primary">
              <Phone />
            </IconButton>
            <IconButton color="primary">
              <VideoCall />
            </IconButton>
            <IconButton color="primary">
              <InfoOutlined />
            </IconButton>
          </Box>
        </Toolbar>
      </HeaderBar>

      {/* Message List */}
      <MessageList>
        {messages.map((msg) => {
          const isSender = msg.senderId === 1;
          const timestamp = formatTimestamp(msg.timestamp);

          if (msg.type === 'like') {
            return (
              <Box key={msg.id} alignSelf={isSender ? 'flex-end' : 'flex-start'} sx={{ mt: 1, mb: 1 }}>
                <Favorite
                  sx={{
                    fontSize: 40,
                    color: isSender ? theme.palette.primary.main : theme.palette.text.secondary,
                  }}
                />
              </Box>
            );
          }

          return (
            <MessageBubble key={msg.id} isSender={isSender}>
              <Typography variant="body2">{msg.content}</Typography>
              {/* Optional: Show time when hovering or click, but here we show it below */}
              <MessageTime isSender={isSender}>{timestamp}</MessageTime>
            </MessageBubble>
          );
        })}
        <div ref={messagesEndRef} />
      </MessageList>

      {/* Input Area */}
      <Box sx={{ p: '5px 0' }}>
        <InputArea>
          {isInputEmpty ? (
            <>
              <IconButton color="primary" onClick={handleMenuClick}>
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon><AttachFile fontSize="small" /></ListItemIcon>
                  Attach File
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon><Mic fontSize="small" /></ListItemIcon>
                  Record Audio
                </MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton color="primary">
              <Mood />
            </IconButton>
          )}

          <InputField
            placeholder="Aa"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            multiline
            maxRows={4}
          />

          {isInputEmpty ? (
            <>
              <IconButton color="primary">
                <AttachFile />
              </IconButton>
              <IconButton color="primary">
                <Mic />
              </IconButton>
              <SendButton onClick={handleSendLike}>
                <Favorite />
              </SendButton>
            </>
          ) : (
            <SendButton onClick={handleSendMessage}>
              <Send />
            </SendButton>
          )}
        </InputArea>
      </Box>
    </ChatWindowContainer>
  );
};

export default ChatWindow;