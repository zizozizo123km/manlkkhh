import apiClient from './apiClient';

/**
 * Fetches the details of the currently authenticated user.
 * @returns {Promise<Object>} A promise that resolves to the user object.
 */
export const getCurrentUser = async () => {
  try {
    // Standard endpoint to get the current user's profile, similar to Facebook's /me
    const response = await apiClient.get('/users/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

/**
 * Fetches the profile details of a specific user by ID.
 * @param {string} userId The ID of the user to fetch.
 * @returns {Promise<Object>} A promise that resolves to the user object.
 */
export const getUserProfile = async (userId) => {
  if (!userId) {
    throw new Error('User ID must be provided.');
  }
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user profile for ID ${userId}:`, error);
    throw error;
  }
};

/**
 * Updates specific fields for the current user's profile.
 * @param {Object} updates An object containing the fields and new values to update.
 * @returns {Promise<Object>} A promise that resolves to the updated user object.
 */
export const updateCurrentUserProfile = async (updates) => {
  try {
    // Using PATCH for partial updates to the profile
    const response = await apiClient.patch('/users/me', updates);
    return response.data;
  } catch (error) {
    console.error('Error updating current user profile:', error);
    throw error;
  }
};

/**
 * Retrieves the list of friends for the current user.
 * @returns {Promise<Array<Object>>} A promise resolving to an array of friend user objects.
 */
export const getCurrentUserFriends = async () => {
    try {
        const response = await apiClient.get('/users/me/friends');
        return response.data;
    } catch (error) {
        console.error('Error fetching current user friends:', error);
        throw error;
    }
}