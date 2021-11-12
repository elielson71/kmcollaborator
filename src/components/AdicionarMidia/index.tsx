import { Button, FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, Select, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import { useState } from "react";
import { typePropsLinks, useLinks } from "../../Hooks/links/useLinks";
import Delete from "@material-ui/icons/Delete";


export function AdicionarMidia(props:typePropsLinks) {
    const classes = useStyles()
    const {links,id_midia,setId_midia,handleAddLinks,allBaseConhecimento,handleDeleteLinks} = useLinks(props)

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
                                onChange={e => setId_midia(e.target.value as string)}
                                value={id_midia?id_midia:''}
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
                        <Button variant='contained' color='primary' onClick={(e)=>handleAddLinks(e,id_midia)}>Adicionar</Button>
                    </Grid>
                </Grid>
                <Grid container>
                    {links.map((item, key) =>
                        <List key={key}>
                            <ListItem >
                                <ListItemText primary={item.dados} />
                                <Button onClick={()=>handleDeleteLinks(key, item.id_links?item.id_links:0)} startIcon={<Delete/>} />
                            </ListItem>
                        </List>)}
                </Grid>
            </Paper>
        </Grid>
    )
}