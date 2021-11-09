import {  useState } from "react";
import { api } from "../../service/Api";
import {  getToken, logout } from '../../service/authService';

export function useMenu() {

  async function sair() {
    const resposta = window.confirm("Deseja realmente sair do sistema?")
    if (resposta) {
      const resp = await api.get('/api/destroyToken', { headers: { "Authorization": `Bearer ${getToken()}` } })
      if (resp.status === 200) {
        logout()
        window.location.href = '/'
      } else {
        alert('não possível sair do sistema')
      }
    }
  }

    const [open, setOpen] = useState(true);
    const handleDrawerOpen = () => {
      setOpen(prev=>!prev);
    };
  return {
    sair,open,handleDrawerOpen
  }
}
