import { useContext, Fragment } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { logout } from '../../services/users-service';
import { AuthContext } from '../../contexts/AuthStore';
import Langs from '../langs/Langs';
import logo from '../../images/icons/saturno_gold.png'

function Navbar() {
  const { t } = useTranslation()
  const { user, isAuthenticated, isCompany, onUserChange } = useContext(AuthContext);
  const history = useHistory();

  async function handleLogout() {
    await logout();
    onUserChange(undefined);
    history.push('/login');
  }



  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/events">
        <img src={logo} alt="Logo" width="48" height="40" style={{ paddingRight: '10px'}}  className="d-inline-block align-middle"/>

          {t('Navbar.title')}
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navbar" aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/events">{t('Navbar.events')}</NavLink></li>
          </ul>
          <ul className="navbar-nav d-flex">
          <li className="nav-item"><NavLink className="nav-link text-warning" to="/map"><i className="fa fa-globe" aria-hidden="true"></i></NavLink></li>
            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/login">{t('Navbar.login')}</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/register">{t('Navbar.register')}</NavLink></li>
              </Fragment>
            )}
            {isAuthenticated() && (
              <Fragment>
                <li className="nav-item"><Link className="nav-link text-warning" to="/notifications-list"><i className="fa fa-bell" /></Link></li>
                  {isCompany() && (
                <li className="nav-item"><Link className="nav-link text-warning" to="/create-event"><i className="fa fa-plus" /> Publicar evento</Link></li>
                )}
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/profile">{user.email}</NavLink></li>
                <li className="nav-item"><button type="submit" className="btn btn-link link-unstyled text-warning" onClick={handleLogout}><i className="fa fa-sign-out " ></i></button></li>
              </Fragment>
            )}
          <li className="nav-item" style={{ paddingTop: '5px'}}><Langs /></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

