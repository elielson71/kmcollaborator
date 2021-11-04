import { Avatar, Box, FormControl, Grid, InputBase, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Paper, Select } from "@material-ui/core";
import { PeopleAlt } from "@material-ui/icons"
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useDepartamento } from "../../Hooks/Departamento/useDepartamento";
import { useBaseConhecimento } from "../../Hooks/BaseConhecimento/useBaseConhecimento";
import { typeDepartamento } from "../Interface";
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


                {filterBusca.map(item =>
                    <List >
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