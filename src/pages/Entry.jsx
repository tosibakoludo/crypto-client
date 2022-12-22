import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEntry, sellEntry } from '../features/entries/entrySlice';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

function Entry() {
  const { entry, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.entries
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { entryId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getEntry(entryId));

    // eslint-disable-next-line
  }, [isError, message, entryId]);

  // Close entry
  const onEntryClose = () => {
    dispatch(sellEntry(entryId));
    toast.success('Investment sold.');
    navigate('/entries');
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>;
  }

  return (
    <div className="entry-page">
      <header className="entry-header">
        <BackButton url="/entries" />
        <h2>
          Entry ID: {entry._id}
          <span className={`status status-${entry.status}`}>
            {entry.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(entry.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Coin: {entry.coin}</h3>
        <hr />
        <div className="entry-desc">
          <h3>Details</h3>
          <p>
            {entry.amount} {entry.coin}, at a cost of {entry.price}$
          </p>
        </div>
      </header>

      {entry.status !== 'sell' && (
        <button onClick={onEntryClose} className="btn btn-block btn-danger">
          Sell Investment
        </button>
      )}
    </div>
  );
}

export default Entry;
