import React, { useEffect, useState } from "react";
import { useAuth } from "../../conext/authContext";
import {  getTipoUsuario } from "../../service/authService";
import { getOneUsuario } from "../../service/UsuarioService";

interface PermissionComponentProps {
  role?: string;
}

const PermissionComponent: React.FC<PermissionComponentProps> = ({
  role,
  children,
}) => {
  const [permissions, setPermissions] = useState<boolean>(false);

  //const idUsuarioLogado = getIdUsuario()
  const { idUsuarioLogado } = useAuth()
  useEffect(() => {
    async function loadRoles() {
      setPermissions(getTipoUsuario()==='S')
      if (idUsuarioLogado === null)
        return
      const response = await getOneUsuario(idUsuarioLogado);
      if (response.status === 200) {
        if (response.data[0])
          setPermissions(response.data[0].administrador === 'S');
      }
    }

    loadRoles();
  }, [idUsuarioLogado]);

  return <>{permissions && children}</>;
};

export default PermissionComponent;