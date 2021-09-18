
import { makeStyles} from '@material-ui/core/';
export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',

    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: 20,
        display: 'flex',
        justifyContent: 'space-evenly',
        //overflow: 'auto',

    },
    formControl: {
        //margin: theme.spacing(1),
        minWidth: 250,

    },
    selectEmpty: {
        marginTop: theme.spacing(6),

        //width: '100%',
    },
    botoes: {
        margin: 10
    },
    textField: {

        width: '100%',
    },
    typeQuestion:{
        width:'100%',
        display:'flex',
        justifyContent:'space-evenly'
    }
}));