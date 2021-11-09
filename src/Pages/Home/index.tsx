import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { MenuItens } from '../../components/MenuItens';
import { Copyright } from '../../components/Footer';
import { GraficoAvaliacoes } from '../../components/GraficoAvaliacoes';
import { ProfissionalLista } from '../../components/ProfissionaisLista';
import { GradeAvaliacao } from '../../components/GradeAvaliacao';
import { GraficoNotas } from '../../components/GraficoNotas';
import PermissionComponent from '../../components/PermissionComponent';
import { useState, useEffect } from 'react';
import { useStyles } from './styles';
import { useAuth } from '../../conext/authContext';
import { useProfissional } from '../../Hooks/Profissional/useProfissional';
import { Paper, Typography } from '@material-ui/core';


export function Dashboard() {
  const classes = useStyles();
  const { tipoUsuarioLogado, idProfissionalLogado } = useAuth()
  const [prof, setProf] = useState({ id: idProfissionalLogado, nome: '' })
  const { profissional } = useProfissional(idProfissionalLogado as unknown as string)


  useEffect(() => {
    
    if (profissional)
      setProf({ id: profissional.id_profissional ? profissional.id_profissional : 0, nome: profissional.nome_completo })
  }, [profissional])


  return (
    <div className={classes.root}>
      <MenuItens titulo={`KMCollaborator`} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3} >
            <PermissionComponent >
              <Grid item sm={3}>
                <ProfissionalLista setProf={setProf} />
              </Grid>
            </PermissionComponent>

            <Grid item sm={tipoUsuarioLogado ? 9 : 12}>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <Paper>
                    
                    <Typography variant='h4' align='center'>{prof.nome}</Typography>
                  </Paper>
                </Grid>
                <Grid item sm={9}>
                  <GradeAvaliacao prof={prof.id} />
                </Grid>
                <Grid item sm={3}>
                  <GraficoNotas prof={prof.id} />
                </Grid>
              </Grid>
              <Grid container spacing={1} >
                <Grid item sm={12} >
                  <GraficoAvaliacoes prof={prof.id} />
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