import { Button, Grid, Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import { getLinksAvaliacoes } from "../../service/AvaliacoesService"
import { typeLinksAvaliacoes } from "../Interface"
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { useAvaliacoes } from "../../Hooks/Avaliacao/useAvaliacoes";
import { useBaseConhecimento } from "../../Hooks/BaseConhecimento/useBaseConhecimento";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 100,
        maxWidth: 300,
        padding: 5
    },
    card: {
        padding: '0px 5px',

    },

    content: {
        display: 'flex',
        justifyContent: 'center',
        minHeight: 120,
        //maxHeight: 120,
        paddingTop: 20,
    },
    mostrax: {
        maxHeight: 400,
        overflow: 'auto'
    },
    principal: {
        //minHeight: '100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    msg: {
        backgroundColor: '#fff',
        borderColor: 'azure',
        borderStyle: 'groove',
        borderRadius: '20px',
        width: '80%',
        textAlign: 'center',
        padding: '40px',

    },
    title: {
        padding: 20
    },
    typo: {
        wordBreak: 'break-all'
    }
}));
type props = {
    avaliacaoId: string
    handleClose: () => void | undefined
    mostrax: boolean
}

export function LinksAvaliacoes({ avaliacaoId, handleClose, mostrax }: props) {
    const classes = useStyles();
    const [LinksAvaliacoes, setLinksAvaliacoes] = useState<typeLinksAvaliacoes[]>([])
    const { avaliacao } = useAvaliacoes(avaliacaoId)
    async function linksAvaliacao(avaliacaoId: string) {
        if (avaliacaoId) {
            const resp = await getLinksAvaliacoes(parseInt(avaliacaoId))
            if (resp.status === 200)
                setLinksAvaliacoes(resp.data)
        }
    }
    useEffect(() => {
        linksAvaliacao(avaliacaoId)
    }, [])
    const { getUrl } = useBaseConhecimento('')
    //const [url, setUrl] = useState('')
    async function abrirLink(id: number) {
        const url = await getUrl(id)
        if (url)
            window.open(process.env.REACT_APP_TYPE_LOCAL==='PRO'?url:`${process.env.REACT_APP_API_URL}/midias/${url}`)
    }


return (

    <Grid className={!mostrax ? classes.mostrax : ''}>
        <Grid className={classes.content}>
            <Grid container justifyContent="center" className={classes.msg}>
                <Grid container justifyContent="flex-end">
                    {mostrax && <Button variant='outlined' onClick={() => handleClose()}>X</Button>}
                </Grid>
                <Grid item xs={12} className={classes.title}>
                    <Typography variant='h5'>Midias Relacionada a Avaliação ({avaliacao.titulo})</Typography>
                </Grid>
                {LinksAvaliacoes.map((value, key) => (
                    <Grid className={classes.card} item xs={4}>
                        <Card key={key} className={classes.root} component='button' variant='outlined'>
                            <CardContent className={classes.content}>
                                <Typography className={classes.typo} variant='h6'>{value.dados}</Typography>
                            </CardContent>
                            <CardActions >
                                <Button fullWidth color='primary' variant='outlined' onClick={() => abrirLink(value.id_midia)} >Visualizar</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    </Grid>
)
}