import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '../../context/ThemeContext';
import { COLORS } from '../../constants/colors';
import CustomButton from '../common/CustomButton';

const FriendRequestItem = ({
  id,
  name,
  profilePicture,
  mutualFriendsCount,
  onConfirm,
  onDelete,
  timeSince,
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Image source={{ uri: profilePicture }} style={styles.profileImage} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.timeSince}>{timeSince}</Text>
        </View>

        {mutualFriendsCount > 0 && (
          <Text style={styles.mutualFriends}>
            {mutualFriendsCount} {mutualFriendsCount === 1 ? 'صديق مشترك' : 'أصدقاء مشتركين'}
          </Text>
        )}

        <View style={styles.actions}>
          <CustomButton
            title="تأكيد"
            onPress={() => onConfirm(id)}
            style={styles.confirmButton}
            textStyle={styles.confirmButtonText}
          />
          <CustomButton
            title="حذف"
            onPress={() => onDelete(id)}
            style={styles.deleteButton}
            textStyle={styles.deleteButtonText}
          />
        </View>
      </View>
    </View>
  );
};

FriendRequestItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  profilePicture: PropTypes.string.isRequired,
  mutualFriendsCount: PropTypes.number,
  onConfirm: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  timeSince: PropTypes.string,
};

FriendRequestItem.defaultProps = {
  mutualFriendsCount: 0,
  timeSince: 'الآن',
};

const getStyles = (isDarkMode) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: isDarkMode ? COLORS.dark.background : COLORS.light.background,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: isDarkMode ? COLORS.dark.text : COLORS.light.text,
    flexShrink: 1,
    marginRight: 8,
  },
  timeSince: {
    fontSize: 13,
    color: COLORS.gray,
    textAlign: 'left', // Ensure time is aligned correctly (usually right in RTL)
  },
  mutualFriends: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: COLORS.facebookBlue,
    paddingVertical: 8,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: isDarkMode ? COLORS.dark.secondaryBackground : COLORS.lightGray,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: isDarkMode ? COLORS.white : COLORS.black,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default FriendRequestItem;