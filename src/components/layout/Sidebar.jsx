// src/components/layout/Sidebar.jsx
import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Icons representing common Facebook sidebar links (using Material Icons for simplicity)
import PeopleIcon from '@mui/icons-material/People'; // Friends/Find Friends
import StorefrontIcon from '@mui/icons-material/Storefront'; // Marketplace
import GroupsIcon from '@mui/icons-material/Groups'; // Groups
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'; // Watch/Videos
import HistoryIcon from '@mui/icons-material/History'; // Memories
import EventIcon from '@mui/icons-material/Event'; // Events
import BookmarkIcon from '@mui/icons-material/Bookmark'; // Saved
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // See More

// --- Styled Components ---

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 360, // Typical sidebar width constraint (can be adjusted)
  height: 'calc(100vh - 56px)', // Adjust based on AppBar height (e.g., 56px)
  position: 'sticky',
  top: 56, // Position below the AppBar
  overflowY: 'auto',
  paddingRight: 8,
  paddingLeft: 8,
  paddingTop: 8,
  [theme.breakpoints.down('lg')]: {
    // Hide or adjust behavior for smaller screens if needed
    // In a typical Facebook layout, the sidebar often collapses or disappears on mobile
  },
  // Custom scrollbar styling (optional)
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
  },
  '&:hover::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
  },
}));

const SidebarItem = styled(ListItem)(({ theme }) => ({
  borderRadius: 8,
  padding: '8px 10px',
  marginBottom: 4,
  transition: 'background-color 0.2s',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const SidebarIcon = styled(ListItemIcon)({
  minWidth: 40,
  color: 'inherit', // Icons inherit text color unless overridden
});

// Mock user data (for the profile link)
const MOCK_USER = {
  name: 'اسم المستخدم', // Arabic: User Name
  profilePic: 'https://via.placeholder.com/30', // Replace with actual profile picture URL
};

// Mock sidebar menu items
const sidebarItems = [
  { icon: PeopleIcon, text: 'الأصدقاء', url: '/friends' }, // Friends
  { icon: GroupsIcon, text: 'المجموعات', url: '/groups' }, // Groups
  { icon: StorefrontIcon, text: 'السوق', url: '/marketplace' }, // Marketplace
  { icon: VideoLibraryIcon, text: 'مشاهدة', url: '/watch' }, // Watch
  { icon: HistoryIcon, text: 'الذكريات', url: '/memories' }, // Memories
  { icon: EventIcon, text: 'الأحداث', url: '/events' }, // Events
  { icon: BookmarkIcon, text: 'المحفوظات', url: '/saved' }, // Saved
];

/**
 * Renders the primary sidebar navigation found on the left side of the Facebook UI.
 */
const Sidebar = () => {
  return (
    <SidebarContainer component="aside">
      <List component="nav" disablePadding>

        {/* 1. Profile Link */}
        <SidebarItem>
          <SidebarIcon>
            <img 
              src={MOCK_USER.profilePic} 
              alt={MOCK_USER.name} 
              style={{ width: 30, height: 30, borderRadius: '50%' }} 
            />
          </SidebarIcon>
          <ListItemText primary={<Typography variant="body1" fontWeight={500}>{MOCK_USER.name}</Typography>} />
        </SidebarItem>
        
        {/* 2. Main Navigation Links */}
        {sidebarItems.map((item) => (
          <SidebarItem key={item.text}>
            <SidebarIcon>
              <item.icon />
            </SidebarIcon>
            <ListItemText primary={<Typography variant="body1">{item.text}</Typography>} />
          </SidebarItem>
        ))}

        {/* 3. See More / Expand */}
        <SidebarItem>
          <SidebarIcon sx={{ 
            bgcolor: (theme) => theme.palette.action.selected, // Placeholder for the round blue circle icon
            borderRadius: '50%', 
            p: 0.5, 
            color: 'text.primary',
          }}>
            <ExpandMoreIcon fontSize="small" />
          </SidebarIcon>
          <ListItemText primary={<Typography variant="body1">عرض المزيد</Typography>} />
        </SidebarItem>

        {/* 4. Divider (Optional: separating main links from shortcuts) */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', my: 1, mx: 1 }} />

        {/* 5. Shortcuts Section */}
        <Box sx={{ px: 1.5, py: 0.5 }}>
          <Typography variant="body2" color="textSecondary" fontWeight={600} gutterBottom>
            الاختصارات
          </Typography>
        </Box>

        {/* Mock Shortcuts */}
        <SidebarItem>
          <SidebarIcon>
             {/* Mock icon for a shortcut */}
            <img src="https://via.placeholder.com/20/FF6666" alt="Game" style={{ borderRadius: 6 }} />
          </SidebarIcon>
          <ListItemText primary={<Typography variant="body1">اسم اختصار 1</Typography>} />
        </SidebarItem>
        <SidebarItem>
          <SidebarIcon>
             <img src="https://via.placeholder.com/20/6666FF" alt="Page" style={{ borderRadius: 6 }} />
          </SidebarIcon>
          <ListItemText primary={<Typography variant="body1">اسم اختصار 2</Typography>} />
        </SidebarItem>

      </List>
      
      {/* Footer / Meta Links (Optional: Usually small text at the bottom) */}
      <Box sx={{ p: 2, pt: 1 }}>
        <Typography variant="caption" color="textSecondary">
          الخصوصية · الشروط · الإعلانات · الخيارات الإعلانية · ملفات تعريف الارتباط · المزيد · Meta © 2024
        </Typography>
      </Box>

    </SidebarContainer>
  );
};

export default Sidebar;