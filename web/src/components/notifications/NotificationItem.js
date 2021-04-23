import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';

function NotificationItem({ notification: { typeOfNotification, sender, recipient, event, textNotification, titleNotification } }) {

    const { user} = useContext(AuthContext);
    let header;
    let className;
    let senseOfMessage;

    switch (typeOfNotification) {
        case 'alert':
            header = 'ALERTA!'
            if (user?.id === sender.id) {
                senseOfMessage = "Enviado: "
                className = "alert alert-dismissible  border-alert alert-secondary"
            }
            else{
                senseOfMessage = "Recibido: "
                className = "alert alert-dismissible  border-alert alert-secondary"
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
        <div className="card mb-3 " >
            <div className= {className}>
                <button type="button" className="close" data-dismiss="alert">&times;</button>
                <h4>{senseOfMessage}</h4>
                <h4 className="alert-heading">{header}</h4>
                <h5 >{titleNotification}</h5>

                <p className="mb-0">{textNotification}<a href="#" className="alert-link"> Contestar </a>.</p>
                <h5 >{sender.name}</h5>

            </div>
        </div>
    )
}

export default NotificationItem;
