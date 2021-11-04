import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import { useBaseConhecimento } from "../../Hooks/BaseConhecimento/useBaseConhecimento";

export function AdicionarMidia() {
    const classes = useStyles()
    const { allBaseConhecimento } = useBaseConhecimento('');

    return (
        <Grid className={classes.container}>
            <Paper>
                <Grid container justifyContent='center'>
                    <Typography variant='h6'>Adicionar Midia Referente</Typography>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel id="grupo-label" >Grupo</InputLabel>
                            <Select fullWidth labelId="grupo-label" id="grupo"
                            //value={id_grupo}
                            //onChange={e => setId_Grupo(e.target.value as string)}>
                            >
                                {allBaseConhecimento.map((bc) => (
                                    <MenuItem id="grupo" key={bc.id_midia}
                                        value={bc.id_midia}>{bc.nome.slice(0, bc.nome.indexOf('.'))}</MenuItem>
                                ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}