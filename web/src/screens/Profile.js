import { Fragment } from "react";
import { useTranslation } from 'react-i18next';
import UserProfile from '../components/users/UserProfile';

function Profile() {
  const { t } = useTranslation()
  return (
    <Fragment>
         <h3 className="mb-3">{t('User.title')}</h3>

      <UserProfile />
    </Fragment>
  );
}

export default Profile;

