import classNames from 'classnames';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import {
  vote,
  voteLike,
  voteDislike,
  buttonCopy,
  voted,
  voteShare,
  voteIcon,
} from './vote.module.css';

const fetchVotes = async id => {
  let result = null;
  let error = null;

  try {
    const response = await fetch(`/api/v1/votes/${id}`);

    if (response.status === 404) {
      return [null, null];
    }

    if (response.ok) {
      result = await response.json();
    } else {
      error = await response.json();
    }
  } catch (ex) {
    error = ex;
  }

  return [error, result];
};

const initVotes = async id => {
  let result = null;
  let error = null;

  try {
    const response = await fetch(`/api/v1/votes/${id}`, { method: 'POST' });
    result = await response.json();
  } catch (ex) {
    error = ex;
  }

  return [error, result];
};

const incrementVotes = async (id, action) => {
  let result = null;
  let error = null;

  try {
    const response = await fetch(`/api/v1/votes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ action }),
    });
    result = await response.json();
  } catch (ex) {
    error = ex;
  }
  return [error, result];
};

const copyLinkToBuffer = url => {
  navigator.clipboard.writeText(url);
};

const readVoteStore = id => {
  let item = null;
  try {
    item = localStorage.getItem(`a_${id}_v1`);
    item = item && JSON.parse(item);
  } catch (ex) {
    console.warn(`localstorage doesn't allow to read item`);
  }
  return item;
};

const writeVoteStore = (id, voteType) => {
  const votes = readVoteStore(id);
  const voteValue = (votes && votes[voteType]) || 0;

  try {
    const newValue = { ...votes, [voteType]: voteValue + 1 };
    localStorage.setItem(`a_${id}_v1`, JSON.stringify(newValue));
  } catch (ex) {
    console.warn(`localstorage doesn't allow to store ${voteType} data`, ex);
  }
};

export const Vote = ({ id, url }) => {
  const [votes, setVotes] = useState(null);
  const increment = useCallback(
    action => async () => {
      const [, newVotes] = await incrementVotes(id, action);
      writeVoteStore(id, action);
      setVotes(newVotes);
    },
    [id, setVotes]
  );

  const share = useCallback(async () => {
    copyLinkToBuffer(url);
    await increment('shares')();
  }, [url]);

  const userVotes = useMemo(() => {
    return readVoteStore(id) || {};
  }, [id, votes]);

  useEffect(() => {
    (async function requestVotes() {
      if (id) {
        let [error, result] = await fetchVotes(id);

        if (error) {
          console.error('Failed while loading votes data');
          setVotes(null);
          return false;
        }

        if (!result) {
          [error, result] = await initVotes(id);
        }

        setVotes(result);
      }
    })();
  }, [id, setVotes]);

  if (!votes) {
    return null;
  }

  return (
    <div className={vote}>
      <div>
        <button
          onClick={increment('likes')}
          className={classNames(voteLike, userVotes.likes && voted)}
          disabled={userVotes.dislikes}
        >
          <svg
            width="25"
            height="23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={voteIcon}
              d="M7.044.712a6.037 6.037 0 0 0-6.02 6.05c.017 6.776 6.857 8.536 11.532 15.224 4.387-6.67 11.472-8.721 11.456-15.281a6.037 6.037 0 0 0-6.05-6.02 6.032 6.032 0 0 0-5.45 3.493A6.032 6.032 0 0 0 7.043.712Z"
              fill="#707070"
              fillOpacity=".24"
              stroke="#393939"
              strokeWidth="1.102"
            />
          </svg>
          <span className={buttonCopy}>Good!</span>
        </button>
        <button
          onClick={increment('dislikes')}
          className={classNames(voteDislike, userVotes.dislikes && voted)}
          disabled={userVotes.likes}
        >
          <svg
            width="9"
            height="23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={voteIcon}
              d="M.88 4.71a3.977 3.977 0 1 1 7.818 0l-1.639 8.74a2.31 2.31 0 0 1-4.54 0L.881 4.71Zm6.784 15.415a2.875 2.875 0 1 1-5.75 0 2.875 2.875 0 0 1 5.75 0Z"
              fill="#4F4F4F"
            />
          </svg>
          <span className={buttonCopy}>Mediocre</span>
        </button>
      </div>
      <div>
        <button
          onClick={share}
          className={classNames(voteShare, userVotes.shares && voted)}
        >
          <svg
            width="19"
            height="20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={voteIcon}
              d="m8.672 4.671 2.44-2.44a4.6 4.6 0 1 1 6.505 6.506l-4.88 4.88a4.6 4.6 0 0 1-6.505 0A1.15 1.15 0 1 1 7.86 11.99a2.3 2.3 0 0 0 3.252 0l4.88-4.88a2.3 2.3 0 0 0-3.253-3.252L11.586 5.01a5.77 5.77 0 0 0-2.914-.339Zm1.626 11.385-2.44 2.44a4.6 4.6 0 0 1-6.505-6.506l4.88-4.88a4.6 4.6 0 0 1 6.505 0 1.15 1.15 0 0 1-1.627 1.627 2.3 2.3 0 0 0-3.252 0l-4.88 4.88a2.3 2.3 0 0 0 3.253 3.252l1.152-1.152a5.77 5.77 0 0 0 2.914.34Z"
              fill="#303030"
            />
          </svg>
          <span className={buttonCopy}>Copy Link</span>
        </button>
      </div>
    </div>
  );
};
