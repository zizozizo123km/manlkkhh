import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context object
const AuthContext = createContext();

/**
 * Custom hook to easily consume the AuthContext
 * @returns {object} The authentication context values (currentUser, login, logout, etc.)
 */
export const useAuth = () => {
  return useContext(AuthContext);
};

/**
 * Provides authentication state and functions to the application.
 */
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Simulated Authentication Service Functions ---
  
  /**
   * Simulates traditional email/password login.
   * Replace this placeholder with actual backend integration (e.g., Firebase signInWithEmailAndPassword).
   */
  const login = async (email, password) => {
    console.log(`[AUTH] Attempting standard login for: ${email}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'user@facebook.com' && password === 'fbpass') {
          const user = { uid: 'user_001', email, displayName: 'Mock FB User', photoURL: 'mock_url' };
          setCurrentUser(user);
          resolve(user);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 700);
    });
  };

  /**
   * Simulates logging in using the Facebook SDK/OAuth flow.
   * Replace this with actual Facebook SDK logic.
   */
  const signInWithFacebook = async () => {
    console.log('[AUTH] Initiating Facebook social login flow...');
    return new Promise((resolve, reject) => {
      // Placeholder for Facebook OAuth redirection or pop-up
      setTimeout(() => {
        const facebookUser = { 
          uid: 'fb_oauth_987', 
          email: 'official@fb_user.com', 
          displayName: 'Official Facebook Login',
          photoURL: 'https://graph.facebook.com/me/picture' 
        };
        setCurrentUser(facebookUser);
        resolve(facebookUser);
      }, 1000);
    });
  };
  
  /**
   * Simulates user logout.
   */
  const logout = async () => {
    console.log('[AUTH] Logging out user.');
    return new Promise(resolve => {
      setTimeout(() => {
        setCurrentUser(null);
        resolve(true);
      }, 300);
    });
  };


  // Effect to check initial authentication state (runs once)
  useEffect(() => {
    // In a real application (e.g., using Firebase Auth):
    // const unsubscribe = auth.onAuthStateChanged(user => {
    //   setCurrentUser(user);
    //   setLoading(false);
    // });
    
    // Simulation: Check local storage for an existing token/session
    const checkSession = () => {
      console.log("[AUTH] Checking initial session...");
      setTimeout(() => {
        // Assume session check complete
        setLoading(false);
      }, 1500); 
    };
    
    checkSession();
    
    // Cleanup function if using a real subscription listener
    return () => {
      // unsubscribe(); 
    };
  }, []);

  const value = {
    currentUser,
    loading,
    login,
    logout,
    signInWithFacebook,
    // Add signUp, resetPassword, etc. here if needed
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Wait until the initial authentication check is complete */}
      {!loading && children}
    </AuthContext.Provider>
  );
};