import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EventAvailable from '@material-ui/icons/EventAvailable';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import GroupAdd from '@material-ui/icons/GroupAdd';
import {Link} from 'react-router-dom'
import { api } from '../../service/Api';
import { getToken, logout } from '../../service/authService';

export const ListMenuItens = (
  <div>
    <ListItem button component={Link} to='/home'>
      <ListItemIcon >
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to='/avaliacao'>
      <ListItemIcon>
        <EventAvailable />
      </ListItemIcon>
      <ListItemText primary="Avaliações"  />
    </ListItem>
    <ListItem button component={Link} to='/profissionais'>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Profissionais" />
    </ListItem>
    <ListItem button component={Link} to='/home'>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Relatórios" />
    </ListItem>
    <ListItem button component={Link} to='/home'>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Base de Conhecimento" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Opções</ListSubheader>
    <ListItem button component={Link} to="/usuario">
      <ListItemIcon>
        <PeopleAlt />
      </ListItemIcon>
      <ListItemText primary="Usuario" />
    </ListItem>
    <ListItem button component={Link} to="/departamento">
      <ListItemIcon>
        <PeopleAlt />
      </ListItemIcon>
      <ListItemText primary="Departamento" />
    </ListItem>
    <ListItem button >
      <ListItemIcon>
        <GroupAdd />
      </ListItemIcon>
      <ListItemText primary="Grupos de Perfis" />
    </ListItem>
    <ListItem button onClick={sair} component={Link} to="/">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Sair"  />
    </ListItem>
  </div>
);
async function sair(){
  if(window.confirm("Deseja realmente sair do sistema?")){
    const resp = await api.get('/api/destroyToken',{headers:{"Authorization": `Bearer ${getToken()}`}})
    if(resp.status==200){
      logout()
      window.location.href = '/'
    }else{
      alert('não possível sair do sistema')
    }
  }
}