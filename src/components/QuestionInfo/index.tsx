import React from 'react';
//import './styles.scss';
import { typeQuestions } from '../Interface'
import { Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useStyles } from './styles';
import { useDepartamento } from '../../Hooks/Departamento/useDepartamento';

type props = {
    hiddenInfo: boolean
    info: typeQuestions
    setInfo: React.Dispatch<React.SetStateAction<typeQuestions>>
}

export function QuestionInfo({ info, setInfo, hiddenInfo }: props) {
    const classes = useStyles();
    const { departamentos } = useDepartamento('')
    return (

        <Card hidden={hiddenInfo}>
            <CardHeader
                title='Informações'
            />
            <CardContent>
                <Grid container >
                    <Grid item xs={12} sm={7}>
                        <FormControl fullWidth >
                            <InputLabel id="senioridade">Senioridade</InputLabel>
                            <Select
                                label="senioridade"
                                id="senioridade"
                                className={classes.selectEmpty}
                                value={info.senioridade}
                                onChange={event => setInfo({ ...info, senioridade: event.target.value as string })}
                            >
                                <MenuItem value="">Selecione uma Senioridade</MenuItem>
                                <MenuItem value="J">Junior</MenuItem>
                                <MenuItem value="P">Pleno</MenuItem>
                                <MenuItem value="S">Senior</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <FormControl fullWidth >
                            <InputLabel id="nivel">Nivel</InputLabel>
                            <Select
                                label="Nivel"
                                id="nivel"
                                className={classes.selectEmpty}
                                onChange={event => setInfo({ ...info, nivel: event.target.value as string })}
                            >
                                <MenuItem value="F" >Facil</MenuItem>
                                <MenuItem value="M">Médio</MenuItem>
                                <MenuItem value="D">Díficil</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <FormControl fullWidth >
                            <InputLabel id="departamento">Departamento</InputLabel>
                            <Select
                                label="Departamento"
                                id="departamento"
                                className={classes.selectEmpty}
                                value={`${info.id_departamento}`}
                                onChange={event => setInfo({ ...info, id_departamento: parseInt(event.target.value as string) })}
                            >
                                {departamentos.map(d => (<MenuItem id="departamento" value={d.id_departamento} >{d.nome}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
};

