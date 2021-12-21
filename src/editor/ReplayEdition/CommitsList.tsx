import { ReactNode } from 'react';

import { createSelector } from '@reduxjs/toolkit';
import cx from 'classnames';
import { useDispatch } from 'react-redux';

import { PlayedCommitData } from '../../../domain/types';
import { useSelector } from '../../App';
import { selectReplay } from '../../store/slices/replay.selectors';
import { addCommit } from '../domain/usecases/addCommit';
import { moveCursorToInitialPosition } from '../domain/usecases/moveCursorToInitialPosition';
import { setCurrentCommit } from '../domain/usecases/setCurrentCommit';

import { AddItemButton, List, ListHeader, ListItem } from './List';

export const selectCommitsVM = createSelector(selectReplay, (replay) => {
  if (replay.commits.length === 0) {
    return [];
  }

  return replay.commits.map((commit, n) => ({
    ...commit,
    commit,
    name: commit.name || <>&nbsp;</>,
    isCurrent: n === replay.currentCommitIndex,
    isPlayed: n <= replay.currentCommitIndex,
    summary: `commit ${n}`,
  }));
});

export const CommitsList: React.FC = () => {
  const dispatch = useDispatch();
  const commits = useSelector(selectCommitsVM);

  return (
    <List
      header={<ListHeader>Commits</ListHeader>}
      addItem={<AddItemButton onClick={() => dispatch(addCommit())}>Add commit</AddItemButton>}
    >
      {commits.map((commit, n) => (
        <CommitsListItem key={n} index={n} {...commit} />
      ))}
    </List>
  );
};

type CommitListItemProps = {
  index: number;
  commit: PlayedCommitData;
  name: ReactNode;
  summary: string;
  isCurrent: boolean;
  isPlayed: boolean;
};

const CommitsListItem: React.FC<CommitListItemProps> = ({ commit, name, summary, isCurrent, isPlayed }) => {
  const dispatch = useDispatch();

  const handleCommitClick = (commit: PlayedCommitData) => () => {
    dispatch(setCurrentCommit(commit));
    dispatch(moveCursorToInitialPosition());
  };

  return (
    <ListItem
      role="button"
      className={cx(isCurrent && '!bg-dark-alternate cursor-default text-xl', !isPlayed && 'text-muted')}
      onClick={handleCommitClick(commit)}
    >
      <div className="flex-grow overflow-x-hidden">
        <div>{name}</div>
        <div className="overflow-hidden text-xs text-muted whitespace-nowrap text-ellipsis">{summary}</div>
      </div>
      {isCurrent && <div className="text-3xl text-muted">{'➜'}</div>}
    </ListItem>
  );
};
