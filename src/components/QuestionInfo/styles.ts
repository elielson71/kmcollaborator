import { makeStyles } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core/';
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
        marginRight:'4px'
        //width: '100%',
    },
    botoes: {
        margin: 10
    },
    textField: {

        width: '100%',
    },
    headerQuestion: {
        padding: 10,
        display: 'flex',
        //justifyContent: 'space-between'
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

}));