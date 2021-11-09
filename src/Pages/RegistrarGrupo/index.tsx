
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
import { useStyles } from './style';
import { useGrupo } from '../../Hooks/Grupo/useGrupo';
import { useParams } from 'react-router-dom';

type typeparams = {
  id: string
}

export function RegistrarGrupo() {
  const classes = useStyles();
  const parms = useParams<typeparams>();
  const id_grupo = parms.id
  const {  nome, setNome, history,handleSubmint} = useGrupo(id_grupo)

  return (
    <div className={classes.root}>
      <MenuItens titulo='Grupo' />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h3>Formulario de Grupo</h3>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Nome"
                      fullWidth
                      autoComplete="nome"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} >
                    <Button variant="contained" onClick={() => history.push('/grupo')} startIcon={<ArrowBack />} className={classes.botoes}>
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

