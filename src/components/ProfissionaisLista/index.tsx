import { Avatar, Box, FormControl, Grid, InputBase, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Paper, Select } from "@material-ui/core";
import { PeopleAlt } from "@material-ui/icons"
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useDepartamento } from "../../Hooks/Departamento/useDepartamento";
import { useProfissional } from "../../Hooks/Profissional/useProfissional";
import { typeDepartamento } from "../Interface";
import { useStyles } from "./styles";
type props = {
    setProf: Dispatch<SetStateAction<{
        id: number;
        nome: string;
    }>>
}
export function ProfissionalLista({ setProf }: props) {

    const classes = useStyles();
    const { allProfissionais } = useProfissional('')
    const { departamentos } = useDepartamento('')
    let dep = [] as typeDepartamento[]

    if (departamentos[0]) {
        dep = departamentos
    }
    const [busca, setBusca] = useState(0)
    const filterBusca = useMemo(() => {
        if (busca) {
            return allProfissionais.filter(item =>
                item.id_departamento === busca
            )
        }
        return allProfissionais
    }, [allProfissionais, busca])
    return (
        <Box>
            <Paper className={classes.paper}>
                <Grid item sm={12}>
                    <FormControl fullWidth >
                        <InputLabel id="departamento">Departamento</InputLabel>
                        <Select
                            label="Departamento"
                            id="departamento"
                            className={classes.selectEmpty}
                            //                        value={`${dep.id_departamento}`}
                            onChange={(e) => setBusca(e.target.value as number)}
                        >
                            <MenuItem id="departamento" value={0} >Todos Departamentos </MenuItem>
                            {
                                dep.map(d => (
                                    <MenuItem id="departamento" value={d.id_departamento ? d.id_departamento : 0} >
                                        {d.nome}</MenuItem>))}
                        </Select>
                    </FormControl>
                </Grid>


                {filterBusca.map(item =>
                    <List >
                        <ListItem button component='button' onClick={() => setProf({ id: item.id_profissional ? item.id_profissional : 0, nome: item.nome_completo })}>
                            <ListItemAvatar>
                                <Avatar>
                                    <PeopleAlt />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.nome_completo} />
                        </ListItem>
                    </List>)}
            </Paper>
        </Box>
    )
}