import AnnouncementBar  from '../components/AnnouncementBar'


const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .contact-page {
    min-height: 100vh;
    background: #ffffff;
    font-family: 'Jost', sans-serif;
    color: #1a1a1a;
    padding: 60px 80px 80px;
  }

  .page-title {
    text-align: center;
    font-size: 36px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #1a1a1a;
    margin-bottom: 60px;
  }

  .section {
    margin-bottom: 52px;
  }

  .section-title {
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #1a1a1a;
    margin-bottom: 20px;
  }

  .info-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .info-row {
    font-size: 15px;
    font-weight: 300;
    color: #1a1a1a;
    line-height: 1.5;
  }

  .info-row strong {
    font-weight: 600;
  }

  .info-row a {
    color: #1a1a1a;
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .info-row a:hover {
    color: #555;
  }

  @media (max-width: 600px) {
    .contact-page { padding: 40px 24px 60px; }
    .page-title { font-size: 26px; }
  }
`;

export default function Contact() {
  return (
    <>
      <style>{styles}</style>
      <AnnouncementBar />

      <div className="contact-page">

        <h1 className="page-title">Contact Us</h1>

        <div className="section">
          <div className="section-title">Customer Support</div>
          <div className="info-list">
            <div className="info-row">
              <strong>Business Hours:</strong> Monday to Saturday 09:00 AM – 2:00 AM
            </div>
            <div className="info-row">
              <strong>Complaint Number:</strong>{" "}
              <a href="tel:+923334766356">+92 333 4766356</a>
            </div>
            <div className="info-row">
              <strong>Live Chat Support:</strong>{" "}
              <a href="tel:+923334124921">+92 333 4124921</a>
            </div>
            <div className="info-row">
              <strong>For Calls UAN:</strong>{" "}
              <a href="tel:03041116668">0304-111-666-8</a>
            </div>
            <div className="info-row">
              <strong>E-Mail:</strong>{" "}
              <a href="mailto:bagx.pk@gmail.com">bagx.pk@gmail.com</a>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-title">Locate Us</div>
          <div className="info-list">
            <div className="info-row">
              <strong>Corporate Office:</strong> Bag X Building, 6 – A Waris Road Lahore Pakistan
            </div>
            <div className="info-row">
              <strong>Factory:</strong> 18km Ferozpur Road Lahore Pakistan
            </div>
          </div>
        </div>

      </div>
    </>
  );
}