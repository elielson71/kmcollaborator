import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { MenuItens } from '../../components/MenuItens';
import { Copyright } from '../../components/Footer';
import { GraficoAvaliacoes } from '../../components/GraficoAvaliacoes';
import { ProfissionalLista } from '../../components/ProfissionaisLista';
import { useProfissional } from '../../Hooks/Profissional/useProfissional';
import { GradeAvaliacao } from '../../components/GradeAvaliacao';
import { GraficoNotas } from '../../components/GraficoNotas';
import { useCorrecao } from '../../Hooks/Correcao/useCorrecao';


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
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
  },
  grade: {
    paddingTop: 10,
    display: 'flex',
    justifyContent: 'center'
  }

}));

export function Dashboard() {
  const classes = useStyles();
  const { allProfissionais } = useProfissional('')
  const {allCorrecao} = useCorrecao('')
  return (
    <div className={classes.root}>
      <MenuItens titulo='KMCollaborator' />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3} >
            <Grid sm={3}>
              <ProfissionalLista profissioal={allProfissionais} />
            </Grid>
            <Grid item sm={9}>
              <Grid container spacing={2}>
                <Grid item sm={9}>
                  <GradeAvaliacao />
                </Grid>
                <Grid item sm={3}>
                  <GraficoNotas media={49}/>
                </Grid>
              </Grid>
              <Grid container spacing={1} >
                <Grid  item sm={12} >
                  <GraficoAvaliacoes correcao={allCorrecao}/>
                </Grid>
              </Grid>
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