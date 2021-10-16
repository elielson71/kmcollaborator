import {  Paper } from '@material-ui/core';
import { Bar } from 'react-chartjs-2'
import { avaliacaoDesc } from '../../Hooks/Avaliacao/DescricaoAvaliacao';
import { typeCorrecao } from '../Interface';
import { useStyles } from './styles';

type props = {
  correcao: typeCorrecao[]
}
export function GraficoAvaliacoes({ correcao }: props) {
  const classes = useStyles();
  const data = correcao.map(item=>item.nota) as number[]
  const labels = correcao.map(item=>avaliacaoDesc(item.id_avaliacao)) 
  
  return (
    <Paper className={classes.paper}>
      <Bar
      className={classes.bar}
      width={900}
      height={500}
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
