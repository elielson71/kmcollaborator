import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      padding:'3px 20px'
    },

    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      display: 'flex',
      justifyContent:'center',
      alignItems:'center'
    },
    paper: {
      width:500,
      height:'200px',
      padding: 15,
      display: 'flex',
      overflow: 'auto',
      alignItems:'center',
      justifyContent:'center',
      maxHeight:'200px'
    },


    
  }));