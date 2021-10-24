import { useEffect, useState } from 'react';
import { logout, getToken } from '../service/authService';
import { Route, Redirect } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { api } from '../service/Api';

type TokenState = {
    token: string;
}



export default function AuthProvider({ component: Component, role, ...rest }: any) {
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(true);


    const [token] = useState<TokenState>(() => {
        const token = getToken()
        if (token) {
            api.defaults.headers.authorization = `Bearer ${token}`;
            return { token }
        }
        return {} as TokenState
    })

    async function valid() {
        var res = await api.get('/api/checkToken')
        if (res.status === 401) {
            logout();
            setLoading(false);
            setRedirect(true);
        }

        if (res.status === 200 && role !== 'ADM') {
            setLoading(false);
            setRedirect(false);
            
        } else {
            logout();
            setLoading(false);
            setRedirect(true);
        }
    }


    useEffect(() => {
        valid();
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
