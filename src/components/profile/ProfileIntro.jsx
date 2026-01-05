import React from 'react';
import { Typography, Box, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home as HomeIcon, School as SchoolIcon, LocationOn as LocationOnIcon, Favorite as FavoriteIcon, AccessTime as AccessTimeIcon } from '@mui/icons-material';

// Mock Data for the profile intro details
const mockProfileDetails = [
  { icon: HomeIcon, text: 'يعيش في دبي، الإمارات العربية المتحدة' },
  { icon: SchoolIcon, text: 'درس في جامعة القاهرة' },
  { icon: LocationOnIcon, text: 'من القاهرة، مصر' },
  { icon: FavoriteIcon, text: 'عازب' },
  { icon: AccessTimeIcon, text: 'انضم في ديسمبر ٢٠١٠' },
];

/**
 * Renders the introductory information section for a user's profile.
 * This component typically appears in the left column or near the top of the profile page.
 */
const ProfileIntro = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 2,
        padding: 2,
        boxShadow: 1, // Mimics Facebook card shadow
        direction: 'rtl', // Right-to-left layout for Arabic
      }}
    >
      <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
        مقدمة
      </Typography>

      {/* Placeholder for bio/status text */}
      <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', marginBottom: 2 }}>
        (أضف سيرة ذاتية لوصف نفسك)
      </Typography>

      <List disablePadding>
        {mockProfileDetails.map((detail, index) => (
          <ListItem key={index} disablePadding sx={{ minHeight: 40 }}>
            <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
              <detail.icon />
            </ListItemIcon>
            <ListItemText primary={detail.text} primaryTypographyProps={{ variant: 'body2' }} />
          </ListItem>
        ))}
      </List>

      {/* Edit Bio Button - Full Width */}
      <Box sx={{ marginTop: 2 }}>
        <button
          style={{
            width: '100%',
            padding: '8px 12px',
            backgroundColor: '#E4E6EB', // Facebook standard button gray
            color: '#050505',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '15px',
          }}
          onClick={() => console.log('Edit Details Clicked')}
        >
          تعديل التفاصيل
        </button>
      </Box>

      {/* Featured Section Link (Optional, common on FB) */}
      <Box sx={{ marginTop: 1 }}>
        <button
          style={{
            width: '100%',
            padding: '8px 12px',
            backgroundColor: '#E4E6EB',
            color: '#050505',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '15px',
          }}
          onClick={() => console.log('Add Featured Clicked')}
        >
          إضافة قسم مميز
        </button>
      </Box>

    </Box>
  );
};

export default ProfileIntro;