import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { logout, getToken, getIdUsuario, loginToken, setLoginUsuario } from '../service/authService';
//import { loginToken, setIdUsuario, setLoginUsuario } from '../../service/authService';
import {  useHistory } from 'react-router-dom';

import { api } from '../service/Api';
import { getOneUsuario } from '../service/UsuarioService';

type AuthContextState = {
    tipoUsuarioLogado: boolean
    idUsuarioLogado: number
    token: TokenState
    idProfissionalLogado: number
    userLogged(): boolean
    signIn({ login, senha }: UserData): Promise<void>;
    //inicializar: () => void
}
type TokenState = {
    token: string;
}
interface UserData {
    login: string;
    senha: string;
}


export const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export const AuthProvider: React.FC = ({ children }) => {

    const [tipoUsuarioLogado, setTipoUsuarioLogado] = useState(false)
    const [idUsuarioLogado, setIdUsuarioLogado] = useState(0)
    const [idProfissionalLogado, setIdProfissionalLogado] = useState(0)
    const history = useHistory()


    const [token] = useState<TokenState>(() => {
        const token = getToken()
        if (token) {
            api.defaults.headers.authorization = `Bearer ${token}`;
            return { token }
        }
        return {} as TokenState
    })

    const tipoUsuario = async (id_usuario: number) => {
        if (id_usuario === null || id_usuario === undefined)
            return
        const response = await getOneUsuario(id_usuario);
        if (response.status === 200) {
            setTipoUsuarioLogado(response.data[0].administrador === 'S')
        }
    }
    useEffect(() => {
        const checarToken = async () => {
            var res = await api.get('/api/checkToken');
            if (res.status === 200) {
                setIdUsuarioLogado(res.data.id)
                setIdProfissionalLogado(res.data.id_profissional)
                tipoUsuario(res.data.id)
            }
        };
        checarToken()
    }, []
    )
    const signIn = useCallback(async ({ login, senha }: UserData) => {
        await api.post('/api/authenticate', {
            login,
            senha
        })
            .then(res => {
                
                if (res.status === 200) {
                    loginToken(res.data.token)
                    setIdUsuarioLogado(res.data.id_usuario)
                    setLoginUsuario(res.data.login)
                    setIdProfissionalLogado(res.data.id_profissional)
                    setTipoUsuarioLogado(res.data.tipo === 'S')
                    history.push('/home')
                } else if (res.status === 404) {
                    alert('Usuario não encontrado!')
                } else if (res.status === 401) {
                    alert('Acesso negado!\n Confere Login e senha e tente novamente!')
                } else {
                    alert('Erro ao comunicar com Servidor!')
                }
            }).catch(e => {
                alert('Sem comunicação')
            })
    }, [])

    const userLogged = useCallback(() => {
        const token = getToken()
        if (token) {
            return true;
        }
        return false;
    }, []);

    return (
        <AuthContext.Provider value={{ token, tipoUsuarioLogado, idUsuarioLogado, userLogged, idProfissionalLogado, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth(): AuthContextState {
    const context = useContext(AuthContext);
    return context;
}