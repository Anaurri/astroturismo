import moment from 'moment';
import { Fragment, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import EventsList from '../events/EventsList'




function UserProfile() {
    const { t } = useTranslation()
    const { user, isAuthenticated, isCompany } = useContext(AuthContext);

    return (

        <Fragment>
            <div className="row py-5 px-4">
                <div className="col-md-8">
                    <div className="card shadow-sm border-white rounded bg-black shadow rounded overflow-hidden">
                        <div className="px-4 pt-0 pb-4 cover">
                            <div className="media align-items-end profile-head">
                                <div className="profile mr-3">
                                    <img src={user.avatar} alt="..." width="180" style={{ marginTop: '20px' }} className="rounded mb-2 img-thumbnail bg-white" />
                                    <a href="#" className="btn btn-outline-dark btn-sm btn-block">Edit profile</a>
                                </div>
                                <div className="media-body text-white">
                                    <h4 className="mt-0 text-white" >{user.name}</h4>
                                    <p className="small mb-0"> <i className="fas fa-map-marker-alt"></i>{user.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-light p-4 d-flex justify-content-end text-center">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                    <h5 className="font-weight-bold mb-0 d-block">215</h5><small className="text-muted"> <i className="fas fa-image mr-1"></i>Photos</small>
                                </li>
                                <li className="list-inline-item">
                                    <h5 className="font-weight-bold mb-0 d-block">745</h5><small className="text-muted"> <i className="fas fa-user mr-1"></i>Followers</small>
                                </li>
                                <li className="list-inline-item">
                                    <h5 className="font-weight-bold mb-0 d-block">340</h5><small className="text-muted"> <i className="fas fa-user mr-1"></i>Following</small>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* {isCompany() && ( */}

            <h3 className="mb-3 text-warning">{t('User.events')}</h3>

            <div className="row py-5 px-4">
                <div className="col-md-15">
                    <div className="card shadow-sm rounded bg-black shadow rounded overflow-hidden">

                        <div className="px-4 pt-0 pb-4 cover">
                            <div className="media align-items-end profile-head">
                                <div className="profile mr-3">
                                    <div className="row row-cols-4">
                                    </div>
                                    <EventsList />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* )} */}
        </Fragment>

    )
}

export default UserProfile;
