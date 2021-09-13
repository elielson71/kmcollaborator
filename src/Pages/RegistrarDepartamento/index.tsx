import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { MenuItens } from '../../components/MenuItens';
import { Copyright } from '../../components/Footer';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import { useDepartamento } from '../../Hooks/Departamento/useDepartamento';
import { useStyles } from './stypes';
import { useParams } from 'react-router-dom';
type params = {
  id: string
}
export function RegistrarDepartamento() {
  const classes = useStyles();

  const { id } = useParams<params>();
  const { departamento, handleSubmint, history,handleDepartamento} = useDepartamento(id)

  
  return (
    <div className={classes.root}>
      <MenuItens titulo='Departamento' />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h3>Formulario de Departamento</h3>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={5}>
                  
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Nome"
                      fullWidth
                      autoComplete="given-name"
                      value={`${departamento.nome}`}
                      onChange={e => handleDepartamento(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} >
                    <Button variant="contained" onClick={() => history.push('/departamento')} startIcon={<ArrowBack />} className={classes.botoes}>
                      Volta
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSubmint} startIcon={<SaveIcon />} className={classes.botoes}>
                      Salvar
                    </Button>
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