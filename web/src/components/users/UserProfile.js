import moment from 'moment';
import { Fragment, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import EventsList from '../events/EventList'
import NotificationsList from '../notifications/NotificationsList';
import ReservationsList from '../reservations/ReservationsList';
import ProfileForm from './ProfileForm';







function UserProfile() {
    const { t } = useTranslation()
    const { user, isAuthenticated, isCompany } = useContext(AuthContext); 
    return (

        <Fragment>
            <div className="row py-5 px-4">
                <div className="col-md-8">
                {isAuthenticated() && (

                    <div className="card shadow-sm border-success rounded bg-black shadow rounded overflow-hidden">
                        <div className="px-4 pt-0 pb-4 cover">
                            <div className="media align-items-end profile-head">
                                <div className="profile mr-3">
                                    <img src={user.avatar} alt="..." width="180" style={{ marginTop: '20px' }} className="rounded mb-2 img-thumbnail bg-white" />
                                    <Link to="/update-profile" className="btn btn-outline-dark btn-sm btn-block  border-success  text-success">Edit profile</Link>
                                </div>
                                <div className="media-body text-white">
                                    <h4 className="mt-0 text-white" >{user.name}</h4>
                                    <p className="small mb-0"> <i className="fas fa-map-marker-alt"></i>{user.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-light p-4 d-flex justify-content-start text-center">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item ">
                                   <small className="text-muted"> <i className="fa fa-user text-success"></i>     {user.email}</small>
                                </li>
                                <li className="list-inline-item">
                                    <small className="text-muted"> <i className="fa fa-phone text-success"></i>   {user.phoneNumber}</small>
                                </li>
                                <li className="list-inline-item">
                                   <small className="text-muted"> <i className="fa fa-building text-success"></i>    {user.city}</small>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                </div>
            </div>
            <hr></hr>

            <h3 className="mb-3">Notificaciones</h3>
            <NotificationsList />

            {!isCompany() && (
                <div>
                    <h3 className="mb-3">Reservas</h3>
                    <ReservationsList />
                </div>

            )}
            {isCompany() && (
                <Fragment>

                    <h3 className="mb-3 text-warning">{t('User.events')}</h3>
                    <div className="row py-5 px-4">
                        <div className="col-md-15">
                            <div className="card shadow-sm rounded bg-black shadow rounded overflow-hidden">

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
