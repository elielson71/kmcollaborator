import { Button, Grid, Modal, Paper, Typography } from "@material-ui/core";
import { FormEvent, useState } from "react";
import { api } from "../../service/Api";
import PermissionComponent from "../PermissionComponent";
import { useStyles } from "./styles";
type props = {
    open: boolean
    setOpen: (arg0: boolean) => void

}
export function UploadArquivo({ open, setOpen }: props) {
    const classes = useStyles()
    const [arquivo, setArquivo] = useState<File>();
    const handleClose = () => {
        setOpen(false);
    };
    async function handleSubmitFile(e: FormEvent) {
        e.preventDefault();
        const formData = new FormData();
        const arq = arquivo ? arquivo : ''

        formData.append('file', arq);
        console.log('formData', formData)

        const resp = await api.post("/api/baseconhecimento/upload-file", formData)
        if (resp.status === 200) {
            alert('Upload realizado com sucesso!');
            window.location.reload()
        } else if (resp.status === 400) {
            alert('error Upload não realizado com sucesso, necessário enviar uma imagem PNG ou JPG!')
        } else {
            alert('error Erro: Tente mais tarde ou atualize a pagina!')
        }

    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            {
                <div className={classes.container}>
                    <Paper >
                        <Grid container >
                            <Grid item sm={10}>
                                <Typography variant='h6' className={classes.root}>Importar de Arquivo</Typography>
                            </Grid>
                            <Grid item sm={2}>
                                <PermissionComponent>
                                    <Button variant="outlined" color="primary" onClick={handleClose}>x</Button>
                                </PermissionComponent>
                            </Grid>
                        </Grid>
                        <Paper className={classes.paper}>
                            <Grid container>

                                <Grid item sm={12} className={classes.root}>
                                    <input type='file' multiple
                                        accept="application/pdf,image/*,.txt,.log"
                                        onChange={(e) => { const f = e.target.files ? e.target.files[0] : undefined; setArquivo(f) }} />
                                </Grid>

                                <Grid item sm={12} className={classes.container}>
                                    <Button fullWidth variant='contained' color='primary' onClick={(e) => handleSubmitFile(e)}>Salvar</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Paper>
                </div>

            }

        </Modal>
    )
}