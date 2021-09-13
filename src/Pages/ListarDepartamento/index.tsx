import { makeStyles } from '@material-ui/core/styles';
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
import { useState, useEffect } from 'react';
import { typeDepartamento } from '../../components/Interface';
import { api } from '../../service/Api';
import { useHistory } from 'react-router';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: 15,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  table: {
    minWidth: 650,
  },
}));

export function ListarDepartamento() {
  const classes = useStyles();

  const [departamentos, setDepartamento] = useState<typeDepartamento[]>([])
  const history = useHistory()
  useEffect(() => {
    async function recuperarDados() {
      const resp = await api.get<typeDepartamento[]>('/departamento')
      if (resp.status === 200) {
        setDepartamento(resp.data)
      } else {
        alert('Error ao buscar Departamento Atualize a Pagina\n Se persistir entre em contato com desenvolvedor!')
      }
    }
    recuperarDados()
  }, [])

  async function deleteDepartamento(id: number) {
    if (window.confirm("Deseja realmente excluir departamento?")) {
      const resp = await api.delete(`/departamento/${id}`)
      if (resp.status === 204)
        window.location.reload()
    }
  }

  return (
    <div className={classes.root}>
      <MenuItens titulo='Departamento' />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={3}>
                  <Grid item sm={10}>
                    <h2>Listagem de Departamento</h2>
                  </Grid>
                  <Grid item sm={2}>
                    <ButtonGroup arial-label=''>
                      
                      <Button  variant="contained" color='primary' onClick={() => history.push('/departamento/new')}>Novo Departamento</Button>
                    </ButtonGroup>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} >
                    <TableContainer component={Paper}>
                      <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell align="right">Opções</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {departamentos.map((departamento, key) => (
                            <TableRow key={departamento.id_departamento}>
                              <TableCell component="th" scope="departamento">
                                {key + 1}</TableCell>
                              <TableCell component="th" scope="departamento">
                                {departamento.nome}</TableCell>
                              <TableCell align="right">
                                <ButtonGroup arial-label=''>
                                  <Button color='primary' onClick={() => { history.push('/departamento/' + departamento.id_departamento) }}>Editar</Button>
                                  <Button color='secondary' onClick={() => deleteDepartamento(departamento.id_departamento?departamento.id_departamento:0)}>Delete</Button>
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