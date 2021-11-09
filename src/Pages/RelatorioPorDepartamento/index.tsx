
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
import { useStyles } from './styles';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useRelatorioProfissional } from '../../Hooks/RelatorioProfissional/useRelatorioProfissional';

export function RelatorioDepartamento() {
  const classes = useStyles();
  const { filterBuscaD,
    setBuscaD, id_departamento, setId_departamento, departamentos, mediaD } = useRelatorioProfissional()
  return (
    <div className={classes.root}>
      <MenuItens titulo='Relatório' />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={3}>
                  <Grid item sm={10}>
                    <h2>Relatório de Desempenho Por Departamento</h2>
                  </Grid>

                  <Grid item sm={12}>
                  <Grid container sm={12}>

                    <Grid item sm={10}>
                      <FormControl fullWidth >
                        <InputLabel id="departamento">Departamento</InputLabel>
                        <Select
                          label="Departamento"
                          id="departamento"
                          value={`${id_departamento}`}
                          onChange={(e) => {
                            setBuscaD(e.target.value as number);
                            setId_departamento(e.target.value as number)
                          }}
                        >
                          <MenuItem id="departamento" value={0} ></MenuItem>
                          {departamentos.map((d,key) => (
                            <MenuItem key={key} id="departamento" value={d.id_departamento ? d.id_departamento : 0} >
                              {d.nome}</MenuItem>))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid container sm={2}>
                      <Grid container alignItems='flex-end' direction='column' className={classes.media} >
                        <h5>Media</h5>
                        <h5>{mediaD()!=='NaN'?mediaD():0}</h5>
                      </Grid>
                    </Grid>
                  </Grid>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} >
                    <TableContainer component={Paper}>
                      <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Avaliacoes</TableCell>
                            <TableCell align="center">Profissional</TableCell>
                            <TableCell align="center">Departamento</TableCell>
                            <TableCell align="center">Correção</TableCell>
                            <TableCell align="center">Nota</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filterBuscaD.map((correcao, key) => (
                            <TableRow key={key}>
                              <TableCell component="th" scope="correcao">
                                {key + 1}</TableCell>
                              <TableCell component="th" scope="correcao">
                                {correcao.titulo}</TableCell>
                              <TableCell align="center">{correcao.nome_completo}</TableCell>
                              <TableCell align="center">{correcao.desc_partamento}</TableCell>
                              <TableCell align="center">{new Date(correcao.data_correcao).toLocaleString('pt-br')}</TableCell>
                              <TableCell align="center">{correcao.nota}</TableCell>
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