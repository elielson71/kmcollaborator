
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
import { useCorrecao } from '../../Hooks/Correcao/useCorrecao';
import { Chip, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';


export function ListarCorrecao() {
  const classes = useStyles();
  const { history, allCorrecao: correcoes, excluirCorrecao,
    filterBusca, nome_profissional, avaliacaoDesc,setBusca} = useCorrecao('')

  return (
    <div className={classes.root}>
      <MenuItens titulo='Correcão' />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={3}>
                  <Grid item sm={10}>
                    <h2>Listagem de Correção</h2>
                  </Grid>
                  <Grid item sm={12}>
                    <Grid  className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        placeholder="Pesquisar…"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={e => setBusca(e.target.value)}
                      />
                    </Grid>
                    
                  </Grid>
                  <Grid item sm={2}>
                    {/*<ButtonGroup arial-label=''>

                      <Button variant="contained" color='primary' onClick={() => history.push('/correcao/new')}>Novo Correção</Button>
  </ButtonGroup>*/}
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
                            <TableCell align="center">Nota</TableCell>
                            <TableCell align="right">Opções</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filterBusca.map((correcao, key) => (
                            <TableRow key={correcao.id_correcao}>
                              <TableCell component="th" scope="correcao">
                                {key + 1}</TableCell>
                              <TableCell component="th" scope="correcao">
                                {avaliacaoDesc(correcao.id_avaliacao)}</TableCell>
                              <TableCell align="center">{nome_profissional(correcao.id_profissional)}</TableCell>
                              <TableCell align="center">{correcao.situacao === 'C' ? <Chip label={correcao.nota} color='primary' /> : ''}</TableCell>
                              <TableCell align="right">
                                <ButtonGroup arial-label=''>
                                  <Button color='secondary' hidden={correcao.situacao === 'C'} onClick={() => { excluirCorrecao(correcao.id_correcao ? correcao.id_correcao : 0) }}>Apagar</Button>
                                  {correcao.situacao === 'C' ?
                                    <Button color='primary'
                                      variant='contained'
                                      disabled
                                    //onClick={() => { history.push('/correcao/' + correcao.id_correcao+'&C') }}
                                    >
                                      Corrigida
                                    </Button>
                                    : <Button
                                      color='primary'
                                      onClick={() => { history.push('/correcao/' + correcao.id_correcao) }}>
                                      Corrigir
                                    </Button>}
                                </ButtonGroup>
                              </TableCell>
                            </TableRow>
                          )).sort(() => 1)}
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