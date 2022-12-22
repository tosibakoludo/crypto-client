import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEntries, reset } from '../features/entries/entrySlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import EntryItem from '../components/EntryItem';

function Entries() {
  const { entries, isLoading, isSuccess } = useSelector(
    (state) => state.entries
  );

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getEntries());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <div className="entries">
        <div className="entry-headings">
          <div>Date</div>
          <div>Coin</div>
          <div>Value</div>
          <div>Buy/Sell</div>
          <div></div>
        </div>
        {entries.map((entry) => (
          <EntryItem key={entry._id} entry={entry} />
        ))}
      </div>
    </>
  );
}

export default Entries;
