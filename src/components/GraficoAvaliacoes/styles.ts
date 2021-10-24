import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      padding: 15,
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      height:'100%'
    },
    bar:{
      height:'10px'
    }
  }));