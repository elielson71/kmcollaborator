import { Button, Container, Grid } from "@material-ui/core";
import { useState } from "react";
import { DocumentosLista } from "../../components/DocumentosLista";
import { ExibirDocumento } from "../../components/ExibirDocumentos";
import { UploadArquivo } from "../../components/importarArquivo";
import { MenuItens } from "../../components/MenuItens";

import { useStyles } from "./styles";

const BaseConhecimento = () => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);


    const handleOpen = () => {

        setOpen(true);
    };



    const [documento, setDocumento] = useState({ id: 0, nome: '' })
    return (
        <div className={classes.root}>
            <MenuItens titulo={`Base de Conhecimento`} />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container>
                        <Grid item sm={4}>
                            <Button variant='contained' color='primary' onClick={handleOpen}>UpLoad Arquivos</Button>
                            <Grid item sm={10}>
                                <DocumentosLista setDocumento={setDocumento} />
                            </Grid>
                        </Grid>
                        <Grid item sm={8}>
                            <ExibirDocumento id_midia={documento.id as unknown as string}/>
                        </Grid>
                    </Grid>
                    <UploadArquivo open={open} setOpen={setOpen} />
                </Container>
            </main>
        </div>
    )
};

export default BaseConhecimento;