import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../conext/authContext";
import { getIdUsuario } from "../../service/authService";
import { getGrupo } from "../../service/GrupoService";
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