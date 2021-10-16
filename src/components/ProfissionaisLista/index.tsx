import { Avatar, Box, FormControl, Grid, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Paper, Select } from "@material-ui/core";
import { PeopleAlt } from "@material-ui/icons"
import { useDepartamento } from "../../Hooks/Departamento/useDepartamento";
import { typeProfissional } from "../Interface";
import { useStyles } from "./styles";
type props = {
    profissioal: typeProfissional[]
}
export function ProfissionalLista({ profissioal }: props) {
    const classes = useStyles();
    const {departamentos} = useDepartamento('')
    return (
        <Box>
            <Paper className={classes.paper}>
                <Grid >
                <FormControl fullWidth >
                    <InputLabel id="departamento">Departamento</InputLabel>
                    <Select
                        label="Departamento"
                        id="departamento"
                        className={classes.selectEmpty}
                        //value={`${avaliacao.id_departamento}`}
                        //onChange={(e) => { const v = e.target.value as string; setAvaliacao({ ...avaliacao, id_departamento: parseInt(v) }) }}
                    >
                        {departamentos.map(d => (<MenuItem id="departamento" value={d.id_departamento} >{d.nome}</MenuItem>))}
                    </Select>
                </FormControl>
                </Grid>
                {profissioal.map(item =>
                    <List >
                        <ListItem button component='button'>
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