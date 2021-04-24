import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Card from '../components/card/Card';
import { useContext } from "react";

import AuthContext from '../contexts/AuthStore';  

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IjSFbK7j2RHlS6u7UWEhfORdfNYJoqZpD0y8KtVn1QnTHlI2Tlh98IfXJHuXGfxWaCvNqAftxkIgM1wj8bECcJb00Wwdjzw61');

const CardScreen = () => {

    return (


        <Elements stripe={stripePromise}>
        <div className="container pt-4">
                <div className="row">
                    <div>
                        <Card className ="col-md-4 offset-md-4"/>
                    </div>
                </div>
            </div>
        </Elements >

    );
};

export default CardScreen