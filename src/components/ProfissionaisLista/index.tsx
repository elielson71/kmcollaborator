import { Avatar, Box, FormControl, Grid, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Paper, Select } from "@material-ui/core";
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
                            defaultValue = ""
                            //                        value={`${dep.id_departamento}`}
                            onChange={(e) => setBusca(e.target.value as number)}
                        >
                            <MenuItem id="departamento" value={0} >Todos Departamentos </MenuItem>
                            {
                                dep.map((d,key) => (
                                    <MenuItem key={key} id="departamento" value={d.id_departamento ? d.id_departamento : 0} >
                                        {d.nome}</MenuItem>))}
                        </Select>
                    </FormControl>
                </Grid>


                {filterBusca.map(item =>
                    <List key={item.id_profissional}>
                        <ListItem button component='button' onClick={() => setProf({ id: item.id_profissional ? item.id_profissional : 0, nome: item.nome_completo })}>
                            <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                    {item.nome_completo.toLocaleUpperCase().slice(0,1)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.nome_completo} />
                        </ListItem>
                    </List>)}
            </Paper>
        </Box>
    )
}