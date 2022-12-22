import { Link } from 'react-router-dom';

function EntryItem({ entry }) {
  const count = entry.price * entry.amount;
  return (
    <div className="entry">
      <div>{new Date(entry.createdAt).toLocaleDateString('en-US')}</div>
      <div>{entry.coin}</div>
      <div>{count}$</div>
      <div className={`status status-${entry.status}`}>{entry.status}</div>
      <Link to={`/entry/${entry._id}`} className="btn btn-reverse btn-sm">
        View
      </Link>
    </div>
  );
}

export default EntryItem;
