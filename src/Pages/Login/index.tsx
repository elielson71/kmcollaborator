import { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Copyright } from '../../components/Footer';
import { FormEvent } from 'react-router/node_modules/@types/react';
import { useAuth } from '../../conext/authContext';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

}));


export function Login() {
  const classes = useStyles();
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const {signIn} = useAuth()
  async function handleSumbitLogin(e: FormEvent) {
    e.preventDefault()
    if (login === ''){
      alert('Digite seu login!')
      return
    }else if (senha === ''){
      alert('Digite sua senha!')
      return
    }
    
    signIn({login,senha})
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          KMCOLLABORATOR
        </Typography>
        <form className={classes.form} onSubmit={handleSumbitLogin} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Digite seu Login"
            name="login"
            autoComplete="login"
            autoFocus

            value={login}
            onChange={e => setLogin(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Digite sua senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}