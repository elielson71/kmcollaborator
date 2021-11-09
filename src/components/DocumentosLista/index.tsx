import { Avatar, Box,  Grid, List, ListItem, ListItemAvatar, ListItemText, Paper } from "@material-ui/core";
import { PeopleAlt } from "@material-ui/icons"
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useBaseConhecimento } from "../../Hooks/BaseConhecimento/useBaseConhecimento";
import { useStyles } from "./styles";
import { Buscar } from "../Buscar";
type props = {
    setDocumento: Dispatch<SetStateAction<{
        id: number;
        nome: string;
    }>>
}
export function DocumentosLista({ setDocumento }: props) {

    const classes = useStyles();
    const { allBaseConhecimento } = useBaseConhecimento('')

    const [busca, setBusca] = useState('')
    const filterBusca = useMemo(() => {
        const lowerBusca = busca.toLocaleLowerCase();
        if (busca) {
            return allBaseConhecimento.filter(item =>
                item.nome.toLocaleLowerCase().includes(lowerBusca)
            )
        }
        return allBaseConhecimento
    }, [allBaseConhecimento, busca])
    return (
        <Box>
            <Paper className={classes.paper}>
                <Grid item sm={12}>
                        <Buscar setBusca={setBusca} />
                </Grid>


                {filterBusca.map((item,key) =>
                    <List key={key}>
                        <ListItem button component='button' onClick={() => setDocumento({ id: item.id_midia? item.id_midia : 0, nome: item.nome })}>
                            <ListItemAvatar>
                                <Avatar>
                                    <PeopleAlt />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.nome.slice(0,item.nome.indexOf('.'))} />
                        </ListItem>
                    </List>)}
            </Paper>
        </Box>
    )
}