
import { Button, Grid, IconButton, Paper } from "@material-ui/core";
import { Delete, OpenInNew } from "@material-ui/icons";
import { useBaseConhecimento } from "../../Hooks/BaseConhecimento/useBaseConhecimento";
import { deleteBaseConhecimento } from "../../service/BaseConhecimento";
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
        if (baseconhecimento) {
            if (baseconhecimento.id_midia) {
                const resp = await deleteBaseConhecimento(baseconhecimento.id_midia)
                if (resp.status === 204){
                    window.location.reload()
                }else{
                    alert('Error ao excluir!')
                }
            }
        }
    }

    return (
        <Paper  className={classes.container}>
            <Grid container justifyContent='center' spacing={3} >
                <Grid item sm={10}>
                    <h4>{nome.slice(0, nome.indexOf('.'))}</h4>
                </Grid>
                <Grid>
                {id_midia?<Button onClick={()=>window.open(url ? `${process.env.REACT_APP_API_URL}/midias/` + url : '')} startIcon={<OpenInNew/>}/>:''}
                   {id_midia? <IconButton onClick={() => handleDelete()}><Delete /></IconButton>:''}
                </Grid>
                <Grid className={classes.content} item sm={12}>
                    {
                        <iframe title="PDF" src={url ? `${process.env.REACT_APP_API_URL}/midias/` + url : ''} width="100%" height="100%" allow="autoplay"></iframe>}
                </Grid>
            </Grid>
        </Paper>
    )
}