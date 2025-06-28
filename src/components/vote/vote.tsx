import classNames from 'classnames';
import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { VoteProps, VoteData } from '../../types';
import styles from './vote.module.css';

// Custom hook for vote data management
const useVoteData = (id: string) => {
  const [votes, setVotes] = useState<VoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchVotes = useCallback(async (voteId: string) => {
    try {
      const response = await fetch(`/api/v1/votes/${voteId}`);
      
      if (response.status === 404) {
        return null;
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (err) {
      console.error('Error fetching votes:', err);
      throw err;
    }
  }, []);

  const increment = useCallback(async (voteType: 'like' | 'dislike') => {
    if (!votes) return;

    try {
      const response = await fetch(`/api/v1/votes/${id}/${voteType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedVotes = await response.json();
      setVotes(updatedVotes);
    } catch (err) {
      console.error(`Error incrementing ${voteType}:`, err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, [id, votes]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Create new AbortController for this request
        abortControllerRef.current = new AbortController();
        
        const voteData = await fetchVotes(id);
        setVotes(voteData);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function to abort request if component unmounts
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [id, fetchVotes]);

  return {
    votes,
    loading,
    error,
    increment,
  };
};

const Vote: React.FC<VoteProps> = ({ id }) => {
  const { votes, loading, error, increment } = useVoteData(id);

  const handleLike = useCallback(() => {
    increment('like');
  }, [increment]);

  const handleDislike = useCallback(() => {
    increment('dislike');
  }, [increment]);

  const voteCount = useMemo(() => {
    if (!votes) return 0;
    return votes.likes - votes.dislikes;
  }, [votes]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!votes) {
    return <div>No votes found</div>;
  }

  return (
    <div className={styles.vote}>
      <button
        className={classNames(styles.voteLike, {
          [styles.voted]: votes.userVote === 'like',
        })}
        onClick={handleLike}
        aria-label="Like"
      >
        <span className={styles.voteIcon}>👍</span>
        <span className={styles.buttonCopy}>{votes.likes}</span>
      </button>
      
      <div className={styles.voteShare}>
        <span>{voteCount}</span>
      </div>
      
      <button
        className={classNames(styles.voteDislike, {
          [styles.voted]: votes.userVote === 'dislike',
        })}
        onClick={handleDislike}
        aria-label="Dislike"
      >
        <span className={styles.voteIcon}>👎</span>
        <span className={styles.buttonCopy}>{votes.dislikes}</span>
      </button>
    </div>
  );
};

export default Vote; 