import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { MenuItens } from '../../components/MenuItens';
import { Copyright } from '../../components/Footer';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useState } from 'react'
import Button from '@material-ui/core/Button';
import { api } from '../../service/Api';
import { useHistory } from 'react-router-dom'





const useStyles = makeStyles((theme) => ({
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
    padding: 15,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  formControl: {
    margin: theme.spacing(1),
    width: 100,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));

export function RegistrarUsuario() {
  const classes = useStyles();
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [nome, setNome] = useState('')
  const [administrador, setAdministrador] = useState('N')
  const [email, setEmail] = useState('')
  const history = useHistory();
  async function handleSubmint() {
    const data = {
      login: login,
      senha: senha,
      "nome_completo": nome,
      administrador: administrador,
      email: email,
    }
    if (login !== '' && senha !== '' && nome !== '' && administrador !== '' && email !== '') {
      const resp = await api.post('/usuario', data)
      if (resp.status === 201) {
        history.push('/listarusuario')
      } else {
        alert('Errro ao cadastrar Usuario!')
      }
    } else {
      alert('Preencha todos os campos!')
    }
  }

  return (
    <div className={classes.root}>
      <MenuItens titulo='Usuario' />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h3>Formulario de Usuario</h3>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      required
                      id="login"
                      name="login"
                      label="Login"
                      fullWidth
                      autoComplete="given-name"
                      value={login}
                      onChange={e => setLogin(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      id="senha"
                      name="senha"
                      label="senha"
                      type="password"
                      fullWidth
                      autoComplete="given-name"
                      value={senha}
                      onChange={e => setSenha(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="administrador-label">Administrador</InputLabel>
                      <Select
                        labelId="administrador-label"
                        id="administrador"
                        value={administrador}
                        onChange={e => { const a = e.target.value as string; setAdministrador(a) }}
                      >
                        <MenuItem value='S'>Sim</MenuItem>
                        <MenuItem value='N'>Não</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="nome_completo"
                      name="nome_completo"
                      label="Nome Completo"
                      fullWidth
                      autoComplete="nome_completo"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmint}>
                      Salvar
                    </Button>
                    <Button variant="contained"  onClick={()=>history.push('/listarusuario')}>
                      Volta
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}