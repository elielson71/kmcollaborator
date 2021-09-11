import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Avaliacao } from "../../components/Avaliacao/";
import { typeAvaliacao } from "../../components/Interface";
import { getAvaliacoes } from "../../service/AvaliacoesService";
import { deleteAvaliacoes } from "../../service/AvaliacoesService";

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { MenuItens } from '../../components/MenuItens';
import { Copyright } from '../../components/Footer';
import SearchIcon from '@material-ui/icons/Search'



import './styles.scss'; import Button from "@material-ui/core/Button";
import { alpha, InputBase } from "@material-ui/core";
;



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
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1% 5% 2% 0%',
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

}));


export function ListaAvaliacoes() {
    const [avaliacoes, setAvaliacoes] = useState<typeAvaliacao[]>([])
    const history = useHistory();

    async function dataAvaliacoes() {
        const data = (await getAvaliacoes()).data
        setAvaliacoes(data)
    }

    useEffect(() => {
        dataAvaliacoes()
    }, [])

    async function deleteAvaliacao(id_avaliacoes?: number) {
        if (id_avaliacoes) {
            if (await deleteAvaliacoes(id_avaliacoes))
                setAvaliacoes(avaliacoes.filter(item => item.id_avaliacoes !== id_avaliacoes))

        }
    }
    function EditAvaliacao(id_avaliacoes?: number) {
        if (id_avaliacoes)
            history.push(`/avaliacao/${id_avaliacoes}`)
    }
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MenuItens titulo='Avaliações' />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid container justifyContent="center" className={classes.header}>
                            <Button variant="contained" color="primary" onClick={() => { history.push('/avaliacao/new') }}>NOVA AVALIAÇÃO</Button>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    //onChange={e=>setAvaliacoes(avaliacoes?avaliacoes.filter(av=> av.titulo.toLowerCase().indexOf(e.target.value.toLowerCase())))}
                                />
                            </div>
                        </Grid>
                        <Grid container spacing={3}>
                            {
                                avaliacoes.map((avaliacao) => (
                                    <Grid item xs={4}>
                                        <Avaliacao
                                            key={avaliacao.id_avaliacoes}
                                            id_avaliacoes={avaliacao.id_avaliacoes}
                                            id_departamento={avaliacao.id_departamento}
                                            titulo={avaliacao.titulo}
                                            id_usuario={avaliacao.id_usuario}
                                            editAvaliacao={EditAvaliacao}
                                            deleteAvaliacao={deleteAvaliacao}
                                        //avatar={avaliacao.avatar}
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                    </Grid>

                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>

    )
}