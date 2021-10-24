import { Grid, InputBase } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { Dispatch, SetStateAction } from "react";
import { useStyles } from "./style";
type props = {
     setBusca: Dispatch<SetStateAction<string>>
    }
    export function Buscar({setBusca}:props) {
    const classes = useStyles();
    return (
        <Grid  container >
            <Grid  className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Pesquisar…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={e => setBusca(e.target.value)}
                    
                />
            </Grid>
        </Grid>
    )
}