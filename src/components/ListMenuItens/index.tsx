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
import { Link } from 'react-router-dom'
import { useMenu } from '../../Hooks/Menu/useMenu';
import PermissionComponent from '../PermissionComponent';
export function useListaMenu() {
  const { sair, open, handleDrawerOpen } = useMenu();

  const ListMenuItens = (
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
        <ListItemText primary="Avaliações" />
      </ListItem>
      <PermissionComponent >
        <ListItem button component={Link} to='/correcao'>
          <ListItemIcon>
            <EventAvailable />
          </ListItemIcon>
          <ListItemText primary="Correcão" />
        </ListItem>
        <ListItem button component={Link} to='/profissionais'>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Profissionais" />
        </ListItem>
        </PermissionComponent>
        <ListItem button component={Link} to='/base_conhecimento'>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Base de Conhecimento" />
        </ListItem>
      <PermissionComponent >
        <ListItem button component='button' onClick={handleDrawerOpen}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Relatórios" />
        </ListItem>
        <ListItem button hidden={open} component={Link} to='/relatorioprofissionais'>
          <ListSubheader/>
          <ListItemText secondary={<>Desempenho por <br /> Profissional</>} />
        </ListItem>
        <ListItem button  hidden={open} component={Link} to='/relatoriodepartamento'>
          <ListSubheader/>
          <ListItemText secondary={<>Desempenho por <br /> Departamento</>} />
          
        </ListItem>
      </PermissionComponent>
    </div>
  );

  const secondaryListItems = (

    <div>
      <ListSubheader inset>Opções</ListSubheader>
      <PermissionComponent >
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
        <ListItem button component={Link} to="/grupo" >
          <ListItemIcon>
            <GroupAdd />
          </ListItemIcon>
          <ListItemText primary="Grupos de Perfis" />
        </ListItem>
      </PermissionComponent>
      <ListItem button onClick={() => sair()} >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Sair" />
      </ListItem>
    </div>
  );

  return { ListMenuItens, secondaryListItems, }
}
