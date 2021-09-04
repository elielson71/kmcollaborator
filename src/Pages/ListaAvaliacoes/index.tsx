import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Avaliacao } from "../../components/Avaliacao/";
import { Button } from "../../components/Button";
import { typeAvaliacao } from "../../components/Interface";
import { getAvaliacoes } from "../../service/AvaliacoesService";
import { deleteAvaliacoes } from "../../service/AvaliacoesService";

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { MenuItens } from '../../components/MenuItens';
import { Copyright } from '../../components/Footer';


import './styles.scss';;



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


    /*function handleCreatAssem(event:FormEvent){
        event.preventDefault();
        alert("ok")
        history.push('/avaliacao')
    }*/


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
    <MenuItens titulo='Dashboard' />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <div id="listaAvaliacao">
                            <header>
                                <Button onClick={() => { history.push('/avaliacao/new') }}>CRIAR NOVA AVALIAÇÃO</Button>
                                <h2>Lista de Avaliacoes</h2>
                                <span>KMC</span>
                            </header>

                            {
                                avaliacoes.map((avaliacao) => (
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

                                )


                                )
                            }

                        </div >
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>

    )
}