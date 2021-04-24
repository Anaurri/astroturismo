import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';

function NotificationItem({ notification: { typeOfNotification, sender, recipient, event, textNotification, titleNotification } }) {

    const { user} = useContext(AuthContext);
    let header;
    let className;
    let senseOfMessage;

    switch (typeOfNotification) {
        case 'alert':
            header = 'Evento cancelado'
            if (user?.id === sender.id) {
                senseOfMessage = "Enviado: "
                className = "text-danger"
            }
            else{
                senseOfMessage = "Recibido: "
                className = "bg-white  alert-secondary text-danger"
            }
            break;
        case 'message':
            header = 'Mensaje'
            if (user?.id === sender.id) {
                senseOfMessage = "Enviado: "
                className = "alert alert-dismissible alert-secondary"
            }
            else {
                senseOfMessage = "Recibido: "
                className = "alert alert-dismissible alert-success"
            }
            break;
        case 'notice':
            header = 'Aviso'
            className = "alert alert-dismissible alert-primary"
            senseOfMessage = "Recibido: "

            break;
        default:
            break;
    }

    //Si es sender y company, puede ser alerts o messages
    //Si es sender y cliente, solo puede ser messages
    //Si es recipient y company: solo puede ser messages
    //Si es recipient y cliente: puede ser alerts, messages, o notices.
    return (
        <div className="card  border-warning  bg-white text-light " >
            <div className= "text-light p-2">
                <h6 className={className}>{header}</h6>
                <p>{titleNotification}</p>
                <p >{sender.name}</p>
            </div>
        </div>
    )
}

export default NotificationItem;
