export const TOKEN_KEY = '&app-token';
export const ID_USUARIO = '&id-usuario';
export const LOGIN_USUARIO = '&login-usuario';
export const USER_TYPE = '&user-type';

export const loginToken = (token:string) => { localStorage.setItem(TOKEN_KEY,token); }
export const logout = () => { localStorage.clear() };

export const setIdUsuario = (id:string)=> localStorage.setItem(ID_USUARIO,id);
export const getIdUsuario = () => localStorage.getItem(ID_USUARIO);

export const setLoginUsuario = (login:string) => localStorage.setItem(LOGIN_USUARIO,login);
export const getLoginUsuario = () => localStorage.getItem(LOGIN_USUARIO);

export const setTipoUsuario = (tipo:string) => localStorage.setItem(USER_TYPE,tipo);
export const getTipoUsuario = () => localStorage.getItem(USER_TYPE);

export const getToken = () => localStorage.getItem(TOKEN_KEY)