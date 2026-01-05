import { useState, useEffect } from 'react';

// In a real Facebook app, the base URL would be configured centrally (e.g., via environment variables).
// We simulate a base API for demonstration.
const API_BASE_URL = '/api/v1';

/**
 * Custom hook for fetching data asynchronously and managing the loading, data, and error states.
 * @param {string} endpoint The specific API path to fetch (e.g., '/feed', '/user/123').
 * @param {object} options Optional fetch options (e.g., method, headers).
 * @returns {{data: any, loading: boolean, error: string | null}}
 */
const useFetchData = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If no endpoint is provided, do nothing.
    if (!endpoint) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    const fullUrl = `${API_BASE_URL}${endpoint}`;

    const fetchData = async () => {
      try {
        // Simulating the necessary headers, e.g., for authentication
        const defaultHeaders = {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('fb_token')}`, // Auth token handling
        };

        const config = {
          ...options,
          headers: {
            ...defaultHeaders,
            ...options.headers,
          }
        };

        const response = await fetch(fullUrl, config);

        if (!response.ok) {
          // Attempt to parse JSON error message if available
          const errorBody = await response.text();
          let errorMessage = `HTTP error! Status: ${response.status}`;
          
          try {
            const jsonError = JSON.parse(errorBody);
            errorMessage = jsonError.message || errorMessage;
          } catch (e) {
            // If it's not JSON, use the status text
            errorMessage = response.statusText || errorMessage;
          }

          throw new Error(errorMessage);
        }

        const result = await response.json();

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          // For network failures or parsing issues
          setError(err.message || 'Failed to fetch data.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function to prevent state updates if the component unmounts
    return () => {
      isMounted = false;
    };
  }, [endpoint, JSON.stringify(options)]); // Re-run if endpoint or options change (stringifying options is a simple way to handle object dependency)

  return { data, loading, error };
};

export default useFetchData;