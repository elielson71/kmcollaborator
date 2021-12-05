
import { Button, Grid, IconButton, Paper } from "@material-ui/core";
import { Delete, OpenInNew } from "@material-ui/icons";
import { useBaseConhecimento } from "../../Hooks/BaseConhecimento/useBaseConhecimento";
import { deleteBaseConhecimento, deleteBaseConhecimentoPro } from "../../service/BaseConhecimento";
import storage from "../../service/firebase";
import { useStyles } from "./styles";

type props = {
    id_midia: string
}

export function ExibirDocumento({ id_midia }: props) {
    const classes = useStyles();
    const { baseconhecimento } = useBaseConhecimento(id_midia)
    const url = baseconhecimento ? baseconhecimento.url : ''
    const nome = baseconhecimento ? baseconhecimento.nome : ''

    async function handleDelete() {
        if (window.confirm('Deseja Realmente excluir Documento?')) {
            if (baseconhecimento) {
                if (baseconhecimento.id_midia) {
                    const id = baseconhecimento.id_midia
                    let resp: any = { status: 0 }
                    if (process.env.REACT_APP_TYPE_LOCAL === 'PRO') {
                        storage.ref().child('upload/files/' + baseconhecimento.nome).delete()
                        resp = await deleteBaseConhecimentoPro(id)
                    } else {
                        resp = await deleteBaseConhecimento(id)
                    }
                    if (resp.status === 204) {
                        window.location.reload()
                    } else {
                        alert('Error ao excluir!')
                    }
                }
            }
        }
    }
    const caminho = url ? process.env.REACT_APP_TYPE_LOCAL === 'PRO' ? 'https://' + url : `${process.env.REACT_APP_API_URL}/midias/` + url : ''
    return (
        <Paper className={classes.container}>
            <Grid container justifyContent='center' spacing={3} >
                <Grid item sm={10}>
                    <h4>{nome.slice(0, nome.indexOf('.'))}</h4>
                </Grid>
                <Grid>
                    {id_midia ? <Button onClick={() => window.open(caminho)} startIcon={<OpenInNew />} /> : ''}
                    {id_midia ? <IconButton onClick={() => handleDelete()}><Delete /></IconButton> : ''}
                </Grid>
                <Grid className={classes.content} item sm={12}>
                    {
                        <iframe title="PDF" src={caminho} width="100%" height="100%" allow="autoplay"></iframe>}
                </Grid>
            </Grid>
        </Paper>
    )
}