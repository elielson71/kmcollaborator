import { createContext, useContext, useEffect, useState } from 'react';
import { logout, getToken } from '../service/authService';
import { Route, Redirect } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { api } from '../service/Api';
import { typeUsuario } from '../components/Interface';
type AuthContextState = {
    token: TokenState;
    signIn({ login, senha }: typeUsuario): Promise<void>;
    userLogged(): boolean;
}
type TokenState = {
    token: string;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export default function AuthProvider({ component: Component, role,...rest }: any) {
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
        if (res.status === 200) {
            setLoading(false);
            setRedirect(false);
        } else {
            logout();
            setLoading(false);
            setRedirect(true);
        }


    }
    async function carregarRoles() {
        const resp = await api.get('/api/roles')
    }

    useEffect(() => {
        //setTimeout(() => verify(),1000);
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
export function useAuth(): AuthContextState {
    const context = useContext(AuthContext);
    return context;
  }