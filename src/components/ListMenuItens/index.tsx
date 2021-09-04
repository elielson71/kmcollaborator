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

export const ListMenuItens = (
  <div>
    <ListItem button component={Link} to='/'>
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
    <ListItem button component={Link} to='/relatorios'>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Relatórios" />
    </ListItem>
    <ListItem button component={Link} to='/midias'>
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
    <ListItem button >
      <ListItemIcon>
        <GroupAdd />
      </ListItemIcon>
      <ListItemText primary="Grupos de Perfis" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItem>
  </div>
);