ASTROTURISMO es un portal de reservas de experiencias turísticas de tipo astronómicas por la península. 

El portal nos ofrece un catálogo de experiencias de diferentes eventos astronómicos con un mapa en el que localizamos los eventos
que acompaña a éste catálogo en forma de lista. 
También tenemos una vista para el usuario, donde puede actulizar su perfil, así como ver sus próximos eventos o las notificaciones a su nombre.
Habrá dos tipos de usuario, además del un administrador:
    Uno de tipo compañía, que publicará los eventos y podrá borrarlos o editarlos.
    Uno de tipo cliente, que podrá reservar la experiencia, comprarla.



Proyecto MERN stack para una aplicación web de publicación de experiencias turísticas de astronomía.


Contiene:


Una API REST en el lenguaje NodeJS usando MongoDB y Cloudinary como base de almacenamiento.
- Aplicación de tipo Express
- Los datos para el almacenamiento tratados con mongoose.
- Sesiones y creaciones de usuario apoyadas en librerías passport, express session, brcrypt y totp-generator
- Control de acceso HTTP configurado con CORS.



Una aplicación de React:
- Utiliza Axios para obtener datos de la API REST.
- Se nutre de otras APIs como Google Maps o Stripe.
- Utiliza hooks para usar y actualizar estados.
- Para los estilos se usa Bootstrap 5 y se parte de base de una  hoja css prediseñada. 



Login:

<img src="https://res.cloudinary.com/djzlb3fzs/image/upload/v1621446611/astroturismo/login_pvkddr.png" alt="drawing" width="500"/>

Portal. Listado con scroll para poder ver todos los eventos. También puedo marcar en el mapa uno específico.

<img src="https://res.cloudinary.com/djzlb3fzs/image/upload/v1621446612/astroturismo/experiences_mkpjus.png" alt="drawing" width="500"/>


Compra con tarjeta. 

<img src="https://res.cloudinary.com/djzlb3fzs/image/upload/v1621446611/astroturismo/credit-card_c2pxyh.png" alt="drawing" width="500"/>


Perfil de cliente. Podrá actulizar sus datos, añadir un avatar, asi como visualizar sus reservas y notificaciones.

<img src="https://res.cloudinary.com/djzlb3fzs/image/upload/v1621446612/astroturismo/perfil_rbxfoh.png" alt="drawing" width="500"/>
<img src="https://res.cloudinary.com/djzlb3fzs/image/upload/v1621446612/astroturismo/notification_hr5xi5.png" alt="drawing" width="500"/>


Portal siendo compañía. La propia companía del evento podrá borrar sólo los eventos que le pertenezcan desde el portal.

<img src="https://res.cloudinary.com/djzlb3fzs/image/upload/v1621446612/astroturismo/delete-event_qclddb.png" alt="drawing" width="500"/>


Crear una experiencia siendo compañia.

<img src="https://res.cloudinary.com/djzlb3fzs/image/upload/v1621446612/astroturismo/new-event_wo8qty.png" alt="drawing" width="500"/>
