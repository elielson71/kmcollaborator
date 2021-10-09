import Avatar from "@material-ui/core/Avatar";
import {  makeStyles} from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { Edit, Delete } from '@material-ui/icons/'

import './style.scss'
import Button from "@material-ui/core/Button";
import { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { RealizarAvaliacao } from "../../Pages/RealizarAvaliacao";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import {  Grid, IconButton, Typography } from "@material-ui/core";
type propsAvaliacao = {
    id_avaliacoes?: number
    titulo: string
    id_usuario: number
    id_departamento?: number
    deleteAvaliacao: any
    editAvaliacao: any
}


const useStyles = makeStyles({
    root: {
        minWidth: 150,

    },
    avatar: {
        backgroundColor: red[500],
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        minHeight: 120,
        maxHeight: 120,
    },
    actions: {
        display: 'flex',
        justifyContent: 'center'
    },
    principal: {
        minHeight:'100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#fff',
    }

});


export function Avaliacao({ id_usuario, titulo, id_avaliacoes, editAvaliacao, deleteAvaliacao }: propsAvaliacao) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        //        <Paper className={classes.paper} elevation={3} >
        <Card className={classes.root}>
            <CardHeader
                avatar={<Avatar aria-label="recipe" className={classes.avatar}>R</Avatar>}
                action={
                    <Grid>
                        <IconButton onClick={() => editAvaliacao(id_avaliacoes)}><Edit /></IconButton>
                        <IconButton onClick={() => deleteAvaliacao(id_avaliacoes)}><Delete /></IconButton>
                    </Grid>
                }

            />

            <CardContent className={classes.content}>
                <Typography align="center" color="textPrimary" gutterBottom variant="h5">
                    {titulo}
                </Typography>
            </CardContent>
            <CardActions className={classes.actions}>

                <Button variant="outlined" fullWidth color="primary" onClick={handleOpen} >RESPONDER </Button>
            </CardActions>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {
                    <div className={classes.principal}>
                        <RealizarAvaliacao avaliacaoId={id_avaliacoes?id_avaliacoes as unknown as string:'0'}/>
                        <div>
                            <Button variant="outlined" color="primary" onClick={handleClose}>x</Button>
                        </div>
                    </div>

                }
            </Modal>
        </Card>//</Paper>
    )
}
/*            <div className='info'>
                <h5>DEPARTAMENTO</h5>
                <span>{id_departamento}</span>
                <h5>Nível médio de Dificuldade </h5>
                <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} />
            </div>
 */