import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';

function Home() {
  return (
    <>
      <section className="heading">
        <h1>
          Have you recently invested in crypto? Or you just track your
          investment history?
        </h1>
        <br />
        <p>Please choose from an option below: </p>
        <br />
        <Link to="/new-entry" className="btn btn-reverse btn-block">
          <FaQuestionCircle /> Add New Entry
        </Link>
        <Link to="/entries" className="btn btn-block">
          <FaTicketAlt /> View My Investments
        </Link>
      </section>
    </>
  );
}

export default Home;
