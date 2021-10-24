import {  Paper } from '@material-ui/core';
import { Bar } from 'react-chartjs-2'
import { useCorrecao } from '../../Hooks/Correcao/useCorrecao';
import { typeCorrecao } from '../Interface';
import { useStyles } from './styles';

type props = {
  prof:number
}
export function GraficoAvaliacoes({ prof }: props) {
  const classes = useStyles();
  const {allCorrecao} = useCorrecao('')
  const {avaliacaoDesc} = useCorrecao('')
  const correcao = allCorrecao.filter(item=>item.id_profissional===prof && item.situacao==='C')
  const data = correcao.map(item=>item.nota) as number[]
  const labels = correcao.map(item=>avaliacaoDesc(item.id_avaliacao)) 
  
  return (
    <Paper className={classes.paper}>
      <Bar
      className={classes.bar}
      width={900}
      height={250}
      
      data={{
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: 'blue',
              borderWidth: 1,
            },
          ],
      }}
      >
      </Bar>
    </Paper>
  );
}
