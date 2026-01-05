import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, Avatar, Typography, IconButton, Menu, MenuItem, Collapse } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import moment from 'moment';

/**
 * Styled component for the expand button in comments/likes section
 */
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

/**
 * Post Card Component
 * Displays a single Facebook-style post.
 * @param {object} post - The post data object
 * @param {string} post.id
 * @param {object} post.author
 * @param {string} post.author.name
 * @param {string} post.author.avatarUrl
 * @param {string} post.timestamp - ISO 8601 string
 * @param {string} post.content
 * @param {string} [post.imageUrl] - Optional image URL for the post body
 * @param {number} [post.likesCount=0]
 * @param {number} [post.commentsCount=0]
 * @param {boolean} [post.isLiked=false] - Whether the current user has liked the post
 */
const PostCard = ({ post }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [expanded, setExpanded] = useState(false); // For showing comments/share details (placeholder for now)

  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    // In a real app, this would trigger an API call
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const timeAgo = moment(post.timestamp).fromNow();

  return (
    <Card sx={{ maxWidth: '100%', mb: 2, borderRadius: 2, boxShadow: 3 }}>
      {/* Header */}
      <CardHeader
        avatar={
          <Avatar src={post.author.avatarUrl} alt={post.author.name} />
        }
        action={
          <>
            <IconButton aria-label="settings" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Edit Post</MenuItem>
              <MenuItem onClick={handleMenuClose}>Save Post</MenuItem>
              <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>Delete Post</MenuItem>
            </Menu>
          </>
        }
        title={
          <Typography variant="subtitle1" component="div" fontWeight="bold">
            {post.author.name}
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            {timeAgo}
          </Typography>
        }
      />

      {/* Content Body (Text) */}
      <CardContent sx={{ py: 0 }}>
        <Typography variant="body1" component="p" sx={{ whiteSpace: 'pre-wrap' }}>
          {post.content}
        </Typography>
      </CardContent>

      {/* Content Body (Image/Media) */}
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="Post media"
          style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', marginTop: 8 }}
        />
      )}

      {/* Stats (Likes/Comments bar) */}
      <CardContent sx={{ pt: 1, pb: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
          {likesCount > 0 && (
            <>
              <ThumbUpIcon fontSize="inherit" color="primary" sx={{ mr: 0.5 }} />
              {likesCount}
            </>
          )}
        </Typography>
        <Typography variant="body2" color="text.secondary" onClick={handleExpandClick} sx={{ cursor: 'pointer' }}>
          {post.commentsCount || 0} Comments
          {post.commentsCount > 0 && (
            <ExpandMore
              expand={expanded}
              aria-expanded={expanded}
              aria-label="show more"
              size="small"
              sx={{ ml: 1 }}
            >
              <ExpandMoreIcon fontSize="small" />
            </ExpandMore>
          )}
        </Typography>
      </CardContent>

      {/* Action Bar (Like/Comment/Share) */}
      <CardActions sx={{ borderTop: '1px solid #eee', mx: 2, mt: 1, p: 0 }}>
        {/* Like Button */}
        <IconButton onClick={handleLike} sx={{ flexGrow: 1, borderRadius: 1, '&:hover': { backgroundColor: '#f2f2f2' } }}>
          {isLiked ? (
            <ThumbUpIcon color="primary" sx={{ mr: 1 }} />
          ) : (
            <ThumbUpOutlinedIcon sx={{ mr: 1, color: 'text.secondary' }} />
          )}
          <Typography variant="button" color={isLiked ? 'primary' : 'text.secondary'}>Like</Typography>
        </IconButton>

        {/* Comment Button */}
        <IconButton sx={{ flexGrow: 1, borderRadius: 1, '&:hover': { backgroundColor: '#f2f2f2' } }}>
          <ChatBubbleOutlineOutlinedIcon sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="button" color="text.secondary">Comment</Typography>
        </IconButton>

        {/* Share Button */}
        <IconButton sx={{ flexGrow: 1, borderRadius: 1, '&:hover': { backgroundColor: '#f2f2f2' } }}>
          <ShareOutlinedIcon sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="button" color="text.secondary">Share</Typography>
        </IconButton>
      </CardActions>

      {/* Placeholder for expanded content (e.g., Comments Section) */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ borderTop: '1px solid #eee', pt: 1 }}>
          <Typography paragraph>Comments section placeholder...</Typography>
          {/* In a real application, a separate Comments component would go here */}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PostCard;