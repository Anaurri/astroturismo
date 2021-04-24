import { Fragment, useContext } from "react";
import { useTranslation } from 'react-i18next';
import UserProfile from '../components/users/UserProfile';
import { AuthContext } from '../contexts/AuthStore';
import { useHistory } from 'react-router-dom'



function Profile() {

  const { sessionEnded, onUserChange } = useContext(AuthContext);

  const history = useHistory();
  if (sessionEnded()) {
    console.log("entro")
    
    onUserChange(undefined);
    history.push('/login');


  }

  const { t } = useTranslation()
  return (
    <Fragment>
      <h3 className="mb-3">{t('User.title')}</h3>

      <UserProfile />
    </Fragment>
  );
}

export default Profile;

