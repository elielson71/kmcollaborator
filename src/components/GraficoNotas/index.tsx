import { Paper } from '@material-ui/core';
import { Doughnut, } from 'react-chartjs-2'
import Chart from 'react-google-charts';
import { useStyles } from './styles';
import './styles.scss'
type props = {
  media:number
}
export function GraficoNotas({ media }: props) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <h3>Média Geral</h3>
      <span className={`c-circular-progress c-circular-progress--${media}`} ></span>
    </Paper >
  );

}
