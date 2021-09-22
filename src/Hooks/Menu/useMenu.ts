import { useEffect, useState } from "react";
import { api } from "../../service/Api";
import { getIdUsuario, getToken, logout } from '../../service/authService';
import { getOneUsuario } from '../../service/UsuarioService';

export function useMenu(){
    const [permissao,setPermissao] =useState(false);

    async function managerPermissao() {
        const id = getIdUsuario();
        
        if (id) {
          const data = (await getOneUsuario(parseInt(id))).data
          setPermissao(data[0].administrador !== 'S')
        }
      }
      async function sair() {
        if (window.confirm("Deseja realmente sair do sistema?")) {
          const resp = await api.get('/api/destroyToken', { headers: { "Authorization": `Bearer ${getToken()}` } })
          if (resp.status === 200) {
            logout()
            window.location.href = '/'
          } else {
            alert('não possível sair do sistema')
          }
        }
      }
      useEffect(()=>{
          managerPermissao()
      },[])
      return {
          permissao,sair
      }
}
