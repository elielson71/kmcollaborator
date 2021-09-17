import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Avaliacao } from "../../components/Avaliacao/";
import { typeAvaliacao } from "../../components/Interface";
import { getAvaliacoes } from "../../service/AvaliacoesService";
import { deleteAvaliacoes } from "../../service/AvaliacoesService";
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { MenuItens } from '../../components/MenuItens';
import { Copyright } from '../../components/Footer';
import SearchIcon from '@material-ui/icons/Search'
import Button from "@material-ui/core/Button";
import { InputBase } from "@material-ui/core";
import { useStyles } from "./styles";
;





export function ListaAvaliacoes() {
    const [avaliacoes, setAvaliacoes] = useState<typeAvaliacao[]>([])
    const history = useHistory();

    async function dataAvaliacoes() {
        const resp = await getAvaliacoes()
        if (resp.status === 200)
            setAvaliacoes(resp.data)
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
                        {avaliacoes.length !== 0 ?
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
                            : <Grid item xs={12} alignItems='center'><h4>Nenhuma avaliação foi encontrar</h4></Grid>}
                    </Grid>

                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>

    )
}