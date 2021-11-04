import { alpha, makeStyles } from '@material-ui/core/styles';
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
  formControl: {
    margin: theme.spacing(1),
    width: 100,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));