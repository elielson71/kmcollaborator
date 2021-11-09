
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { MenuItens } from '../../components/MenuItens';
import { Copyright } from '../../components/Footer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useStyles } from './styles';
import { useUsuario } from '../../Hooks/Usuario/useUsuario';
import { Buscar } from '../../components/Buscar';

export function ListarUsuario() {
  const classes = useStyles();
  const {history,excluirUsuario,setBusca,filterBusca} = useUsuario('')

  return (
    <div className={classes.root}>
      <MenuItens titulo='Usuario' />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={3}>
                  <Grid item sm={10}>
                    <h2>Listagem de Usuário</h2>
                  </Grid>
                  
                  <Grid item sm={2}>
                    <ButtonGroup arial-label=''>
                      
                      <Button  variant="contained" color='primary' onClick={() => history.push('/usuario/new')}>Novo Usuario</Button>
                    </ButtonGroup>
                  </Grid>
                </Grid>
                <Buscar setBusca={setBusca} />
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} >
                    <TableContainer component={Paper}>
                      <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Login</TableCell>
                            <TableCell align="center">Nome Completo</TableCell>
                            <TableCell align="center">Data de cadastro</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="right">Opções</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filterBusca.map((usuario, key) => (
                            <TableRow key={usuario.id_usuario}>
                              <TableCell component="th" scope="usuario">
                                {key + 1}</TableCell>
                              <TableCell component="th" scope="usuario">
                                {usuario.login}</TableCell>
                              <TableCell align="center">{usuario.nome_completo}</TableCell>
                              <TableCell align="center">{new Date(usuario.data_cadastro).toLocaleString('pt-br')}</TableCell>
                              <TableCell align="center">{usuario.email}</TableCell>
                              <TableCell align="right">
                                <ButtonGroup arial-label=''>
                                  <Button color='primary' onClick={() => { history.push('/usuario/' + usuario.id_usuario) }}>Editar</Button>
                                  <Button color='secondary' onClick={() => excluirUsuario(usuario.id_usuario)}>Delete</Button>
                                </ButtonGroup>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}