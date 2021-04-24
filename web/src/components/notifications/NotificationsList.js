import { useState, useEffect } from 'react';
import notificationsService from '../../services/notifications-service';
import { Fragment } from 'react';
import NotificationItem from './NotificationItem';

function NotificationsList() {

    const [state, setState] = useState({
        notifications: [],
        loading: false,

    });
    useEffect(() => {
        // componentDidMount

        async function fetchNotifications() {
            console.log('Fetching notifications...');
            setState(state => ({
                ...state,
                loading: true,
            }))
            let notifications = await notificationsService.list();

            if (!isUnmounted) {
                setState({
                    notifications: notifications,
                    loading: false,
                })
            }
        }

        let isUnmounted = false;

        fetchNotifications();

        return () => {
            // componentWillUnmount
            isUnmounted = true;
        }
    }, []);


    const { notifications, loading } = state;

    return (
        <Fragment >
            {notifications.length != 0 && (
                <div className ="mt-5">
                    <h5 className="text-warning text-center" >Tus notificaciones</h5>
                    <div className="container pt-4 pb-5 bg-transparent overflow auto">
                        <div className="row row-cols-2 col-sm-">
                            {notifications.map(notification => (
                                <div key={notification.id} className="col mb-4"><NotificationItem notification={notification}></NotificationItem></div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </Fragment>

    )
}
export default NotificationsList;



