import { Paper, Typography} from '@material-ui/core';

import { useCorrecao } from '../../Hooks/Correcao/useCorrecao';

import { useStyles } from './styles';
//import './styles.scss'
type props = {
  prof: number
}
export function GraficoNotas({ prof }: props) {
  const classes = useStyles();
  const { allCorrecao } = useCorrecao('')
  

  let media = 0 
  let qt =0
  allCorrecao.forEach(item => {
    if (item.id_profissional === prof){
      media += item.nota ? item.nota : 0

      qt+=1
  }})

  return (
    <Paper className={classes.paper}>
      <Typography variant='h4' align='center'>Média </Typography>
      <br/>
      <Typography variant='h2' align='center'>{(media/qt).toFixed(0)}</Typography>
    </Paper >
  );
  
}
//<span className={`c-circular-progress c-circular-progress--${(media/qt).toFixed(0)}`} ></span>
