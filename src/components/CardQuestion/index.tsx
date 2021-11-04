import { Card, CardActionArea, CardActions, CardContent, CardHeader, Chip, Grid, IconButton, makeStyles, Switch, TextField, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { typeQuestions } from '../Interface'
import Delete from '@material-ui/icons/Delete';
import { Edit } from '@material-ui/icons';
type propsQuestion = {
    title: string,
    departamento: number,
    nivel: string
    id_perguntas: number
    deletarQuestao: any
    situacao?: string
    nota_pergunta?: number
    setQuestions: React.Dispatch<React.SetStateAction<typeQuestions[]>>
    id_avaliacao?: number

}
const useStyles = makeStyles({
    root: {
        minWidth: 275,
        display: 'flex',


    },
    typography: {
        height: 100,
        textOverflow: 'ellipsis',

    },

    cardActions: {
        display: 'flex',
        justifyContent: 'space-between'
    }
})


export function CardQuestion({ title, departamento, id_perguntas, nivel, deletarQuestao, situacao, nota_pergunta, setQuestions, id_avaliacao }: propsQuestion) {
    const classes = useStyles();
    const history = useHistory()
    return (
        <Card >
            <CardHeader
                avatar={
                    <>
                        { <Chip color='primary' label={'Suporte'} />}
                        
                    </>
                }
                action={
                    <Grid >
                        <IconButton onClick={() => history.push(`/question/${id_perguntas}`,{id_avaliacao:id_avaliacao})}><Edit /></IconButton>
                        <IconButton onClick={(e) => deletarQuestao(e, id_perguntas)}><Delete /></IconButton>
                    </Grid>}
            />
            <CardContent>
                <CardActionArea>
                    <Grid   >
                        <Typography align="center" noWrap color="textPrimary" gutterBottom variant="h5" title={title}>
                                {title}
                        </Typography>
                    </Grid>
                </CardActionArea>
            </CardContent >
            <CardActions className={classes.cardActions}>
                <Grid item xs={12} sm={3}>
                    <TextField label="Nota"
                        name="Nota"
                        value={nota_pergunta ? nota_pergunta : ''}
                        onChange={e => setQuestions(prev => prev.map(item => item.id_perguntas === id_perguntas ? { ...item, nota_pergunta: e.target.value ? parseFloat(e.target.value) : 0 } : item))}
                        onBlur={e => {
                            if (e.target.value)
                                setQuestions(prev => prev.map(item => item.id_perguntas === id_perguntas ? { ...item, situacao: id_avaliacao ? e.target.value ? 'AB+' : 'CA' : e.target.value ? 'AB' : 'CA' } : item))
                        }}
                    />
                </Grid>

                <Switch
                    checked={situacao ? situacao === 'AB' || situacao === 'AB+' : false}
                    onChange={e => {
                        setQuestions(prev => prev.map(item => item.id_perguntas === id_perguntas ? { ...item, situacao: id_avaliacao ? e.target.checked ? 'AB+' : 'CA' : e.target.checked ? 'AB' : 'CA' } : item))
                        if (!(e.target.checked))
                            setQuestions(prev => prev.map(item => item.id_perguntas === id_perguntas ? { ...item, nota_pergunta: 0 } : item))
                    }}
                    color="primary"
                    name="checkedA"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />


            </CardActions>

        </Card >
    )
}