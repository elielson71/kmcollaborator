import { useEffect, useState } from "react";
import { api } from "../../service/Api";
import { getIdUsuario, getToken, logout } from '../../service/authService';
import { getOneUsuario } from '../../service/UsuarioService';

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
  return {
   sair
  }
}
