import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useStyles } from './styles';
import { useCorrecao } from '../../Hooks/Correcao/useCorrecao';
import { Chip } from '@material-ui/core';
import { typeCorrecao } from '../Interface';
type typeProf = {
  prof: number
}
export function GradeAvaliacao({ prof }: typeProf) {
  const classes = useStyles();
  const { allCorrecao, avaliacaoDesc } = useCorrecao('')
  let correcao_nota = [] as typeCorrecao[]
  if (typeof(allCorrecao)==='object'){
    correcao_nota = allCorrecao.filter(item => item.nota !== null && item.id_profissional === prof)
  }else{
    correcao_nota=[]
  }
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} >
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Avaliacoes</TableCell>
                  <TableCell align="center">Nota</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {correcao_nota.map((correcao, key) => (
                  <TableRow key={correcao.id_correcao}>
                    <TableCell component="th" scope="correcao">
                      {avaliacaoDesc(correcao.id_avaliacao)}</TableCell>
                    <TableCell align="center">{<Chip label={correcao.nota} color='primary' />}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  )
}