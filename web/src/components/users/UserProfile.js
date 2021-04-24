import { Fragment, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import EventsList from '../events/EventList'
import NotificationsList from '../notifications/NotificationsList';
import ReservationsList from '../reservations/ReservationsList';
import ProfileForm from '../users/ProfileForm';


function UserProfile() {
    const { t } = useTranslation()
    const { user, isAuthenticated, isCompany } = useContext(AuthContext);
    return (

        <Fragment>
            <div className="row py-5 px-4 d-flex justify-content-center">
                <div className="col-md-8">
                    {isAuthenticated() && (

                        <div className="card shadow-sm border-warning rounded bg-white shadow rounded overflow-hidden  align-items-center ">
                            <div className="cover">
                                <div className="profile mr-3">
                                    <img src={user.avatar} alt="..." width="180" style={{ marginTop: '20px' }} className="rounded mb-2 img-thumbnail border-warning bg-white" />
                                </div>
                                <div className="media align-items-end profile-head">

                                    <div className="media-body text-warning">
                                        <h5 className="mt-0 text-warning" >{user.name}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-4 d-flex justify-content-start text-center">
                                <ul className="list-inline mb-0">
                                    <li className="list-inline-item ">
                                        <small className="text-muted"> <i className="fa fa-user text-warning"></i>     {user.email}</small>
                                    </li>
                                    {user.phoneNumber != ('undefined' || '') && (
                                        <li className="list-inline-item">
                                            <small className="text-muted"> <i className="fa fa-phone text-warning"></i>   {user.phoneNumber}</small>
                                        </li>
                                    )}
                                    {user.city != ('undefined' || '') && (

                                        <li className="list-inline-item">
                                            <small className="text-muted"> <i className="fa fa-building text-warning"></i>    {user.city}</small>
                                        </li>
                                    )}

                                </ul>
                            </div>
                            <ProfileForm className="mt-3 mb-3"></ProfileForm>

                        </div>
                    )}
                </div>
            </div>
            <NotificationsList />

            {!isCompany() && (
                <div>
                    <ReservationsList />
                </div>

            )}
            {isCompany() &&(
                <Fragment>

                    <h5 className="text-warning text-center" >{t('User.events')}</h5>
                    <div className="row py-5 px-4">
                        <div className="col-md-15">
                            <div className="card shadow-sm rounded bg-transparent shadow rounded overflow-hidden">

                                <div className="px-4 pt-0 pb-4 cover">
                                    <div className="media align-items-end profile-head">
                                        <div className="profile mr-3">
                                            <div className="row row-cols-4">
                                            </div>
                                            <EventsList showFilter={false} companyId={user.id} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </Fragment>
            )}


        </Fragment>

    )
}

export default UserProfile;
