import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/feedSlice';
import FeedListItem from './FeedListItem';
import CreatePost from './CreatePost';
import SkeletonLoader from '../ui/SkeletonLoader';
import ErrorMessage from '../ui/ErrorMessage';
import InfiniteScroll from 'react-infinite-scroll-component';

/**
 * FeedList Component: Renders the main feed of posts.
 * It handles fetching posts, infinite scrolling, and displaying UI states (loading, error, empty).
 */
const FeedList = () => {
  const dispatch = useDispatch();
  const { posts, status, error, hasMore, page } = useSelector((state) => state.feed);
  const [initialLoad, setInitialLoad] = useState(true);

  // Effect to load initial posts when the component mounts
  useEffect(() => {
    if (status === 'idle' || (status === 'failed' && posts.length === 0)) {
      dispatch(fetchPosts({ page: 1, limit: 10 }));
    }
  }, [dispatch, status, posts.length]);

  // Effect to manage the initial load state after the first fetch
  useEffect(() => {
    if (status === 'succeeded' && initialLoad) {
      setInitialLoad(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Function to fetch the next page of posts
  const fetchNextPosts = () => {
    if (status !== 'loading' && hasMore) {
      dispatch(fetchPosts({ page: page + 1, limit: 10 }));
    }
  };

  // -------------------------
  // Render Logic based on State
  // -------------------------

  if (status === 'loading' && initialLoad) {
    // Show skeleton loader only for the very first load
    return (
      <div className="space-y-4">
        <CreatePost />
        <SkeletonLoader count={3} type="post" />
      </div>
    );
  }

  if (status === 'failed' && posts.length === 0) {
    // Show an error message if the initial fetch failed
    return (
      <div className="space-y-4">
        <CreatePost />
        <ErrorMessage message={error || 'Failed to load posts. Please try again.'} />
      </div>
    );
  }

  if (posts.length === 0 && status === 'succeeded') {
    // Show a message if the feed is empty
    return (
      <div className="space-y-4">
        <CreatePost />
        <p className="text-center text-gray-500 p-8 bg-white rounded-lg shadow-md">
          No posts found. Start sharing something new!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <CreatePost />

      <InfiniteScroll
        dataLength={posts.length}
        next={fetchNextPosts}
        hasMore={hasMore}
        loader={<SkeletonLoader count={1} type="post" />}
        endMessage={
          <p className="text-center text-gray-500 py-4">
            <b>You have seen all the posts!</b>
          </p>
        }
      >
        {posts.map((post) => (
          <FeedListItem key={post.id} post={post} />
        ))}
      </InfiniteScroll>

      {/* Display error message if a subsequent fetch fails (e.g., during infinite scroll) */}
      {status === 'failed' && posts.length > 0 && (
        <div className="py-4">
          <ErrorMessage message="Failed to load more posts." />
        </div>
      )}
    </div>
  );
};

export default FeedList;