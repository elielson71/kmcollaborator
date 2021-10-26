import { Grid, Paper } from '@material-ui/core';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2'
import { useCorrecao } from '../../Hooks/Correcao/useCorrecao';
import { useStyles } from './styles';

type props = {
  prof: number
}
export function GraficoAvaliacoes({ prof }: props) {
  const classes = useStyles();
  const { allCorrecao } = useCorrecao('')
  const { avaliacaoDesc } = useCorrecao('')
  const correcao = allCorrecao.filter(item => item.id_profissional === prof && item.situacao === 'C')
  const data = correcao.map(item => item.nota) as number[]
  const [label,setLabel] = useState(100)
  const labels = correcao.map(item => avaliacaoDesc(item.id_avaliacao).slice(label))

  return (
    <Paper className={classes.paper}>
      <Grid>
      <input name='leg' type="checkbox" value={label} onChange={(e)=>setLabel(e.target.checked?0:100)}/>
      <label htmlFor="leg">Mostrar legenda</label>
      </Grid>
      <Bar
        className={classes.bar}
        width={900}
        height={250}
        options={{
          plugins:{
            legend: {
              display: false
            },    
            title:{
              display:false
            },
            
          },
      }}
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
    </Paper >
  );
}
