import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

    content: {
        display: 'flex',
        justifyContent: 'center',
        height: 800,
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        minHeight: 700,
        overflow: 'auto',

    },
    contentQuestion: {
        textAlign: 'center',
        borderStyle: 'groove',
        borderRadius: 10,
        padding: 20,
        margin: '-30px 70px 0px 100px',

        overflow: 'auto',

    },
    contentAnswer: {
        margin: '0px 0px 0px 100px',

    },
    txtarea: {
        borderColor: '#fff',
        borderBottomColor: '#b3b2b2',
        padding: 30,
        width: '100%',
        overflowY: 'hidden',
        marginBottom: '1%',
    },
    btn: {
        display: 'flex',
        alignItems: 'flex-end',
        marginBottom: 20
        

    },
    header:{
        display:'flex',
        justifyContent: 'space-between',
        padding:'20px'

    },
  'input#nota': {
        width: '30px'
    },
    
    MuiInputformControl:{
        
        width: '150px',
        height: '100px',
        fontSize: '50px',
        fontFamily: 'sans-serif',
        fontWeight: 700,
        textAlign: 'center',
        border: 'solid #000000 2px;border-radius: 20px',
        margin: '20px',
    
    },
    btnCheck:{
        color:'green',
        height:'36px',
        },
    Rverdeiro:{
        borderColor:'green',
        color:'green'
    },
    Rfalse:{
        borderColor:'red',
        color:'red'
    }
}));
