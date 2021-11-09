import { Button, FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, Select, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import { useBaseConhecimento } from "../../Hooks/BaseConhecimento/useBaseConhecimento";
import { useMemo,useState } from "react";

export function AdicionarMidia() {
    const classes = useStyles()
    const { allBaseConhecimento } = useBaseConhecimento('');
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
        <Grid className={classes.container}>
            <Paper>
                <Grid container justifyContent='center'>
                    <Typography variant='h6'>Adicionar Midia Referente</Typography>
                </Grid>
                <Grid container alignItems='flex-end'>
                    <Grid item xs={12} sm={8}>
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel id="grupo-label" >Midia</InputLabel>
                            <Select labelId="grupo-label" id="midia"
                            //onChange={e => setId_Grupo(e.target.value as string)}>
                            >
                                {allBaseConhecimento.map((bc) => (
                                    <MenuItem id="midia" key={bc.id_midia}
                                        value={bc.id_midia}>{bc.nome.slice(0, bc.nome.indexOf('.'))}</MenuItem>
                                ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button variant='contained' color='primary'>Adicionar</Button>
                    </Grid>
                </Grid>
                <Grid container>
                    {filterBusca.map((item, key) =>
                        <List key={key}>
                            <ListItem button component='button' >
                                <ListItemText primary={item.nome.slice(0, item.nome.indexOf('.'))} />
                            </ListItem>
                        </List>)}
                </Grid>
            </Paper>
        </Grid>
    )
}