import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createEntry, reset } from '../features/entries/entrySlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

function NewEntry() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.entries
  );

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [coin, setCoin] = useState('Bitcoin (BTC)');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate('/entries');
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  if (isLoading) {
    return <Spinner />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createEntry({ coin, price, amount }));
  };

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create New Entry</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input className="form-control" value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="coin">Coin</label>
            <select
              name="coin"
              id="coin"
              value={coin}
              onChange={(e) => setCoin(e.target.value)}
            >
              <option value="Bitcoin (BTC)">Bitcoin (BTC)</option>
              <option value="Etherium (ETH)">Etherium (ETH)</option>
              <option value="BNB (BNB)">BNB (BNB)</option>
              <option value="Dogecoin (DOGE)">Dogecoin (DOGE)</option>
              <option value="Cardano (ADA)">Cardano (ADA)</option>
              <option value="Polygon (MATIC)">Polygon (MATIC)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              className="form-control"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              name="amount"
              id="amount"
              className="form-control"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewEntry;
