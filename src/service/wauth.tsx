import { useEffect, useState } from 'react';
import { logout, getToken } from './authService';
import { Route, Redirect } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { api } from './Api';



export default function WAuth({ component: Component, ...rest }: any) {
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(true);


    async function verify() {
        const token = getToken()
        
            var res = await api.get('/api/checkToken', { headers: { "Authorization": `Bearer ${token}` } });
            console.log(res)
            if (res.status === 200) {
                setLoading(false);
                setRedirect(false);
            } else {
                logout();
                setLoading(false);
                setRedirect(true);
            }
        

    }

    useEffect(() => {
        //setTimeout(() => verify(),1000);
        verify();
    }, [])

    return (
        loading ?
            <LinearProgress style={{ width: '50%', margin: '80px auto' }} />
            :
            <Route {...rest}
                render={props => !redirect ? (
                    <Component {...props} />
                ) : <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                } />
    )
}