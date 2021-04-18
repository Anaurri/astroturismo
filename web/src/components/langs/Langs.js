
import langES from '../../images/icons/es.png';
import langEN from '../../images/icons/en.png';
import { changeLanguage } from '../../services/i18n-service';

function Langs() {
  return (
    <div className="btn-group lang-group" role="group" aria-label="Languages">
      <button type="button" className="btn btn-link link-unstyled p-0 me-1" onClick={() => changeLanguage('es')}>
        <img src={langES} alt="ES" />
      </button>
      <button type="button" className="btn btn-link link-unstyled p-0" onClick={() => changeLanguage('en')}>
        <img src={langEN} alt="EN" />
      </button>
    </div>
  );
}

export default Langs;
