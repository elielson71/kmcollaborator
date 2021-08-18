import styled from 'styled-components'
export const ButtonIcon = styled.div`

    display: flex;
    justify-content: flex-end;
    button {
        padding: 2%;
        border: none;
        color: blue;
        margin: 5px 2px 0px 15px;
        background: none;
        :hover {
            color: #080707;
        }
    }
`

export const AnswerInput = styled.input `
    padding: 2%;
    width: 80%;
    border-color: rgba(92, 83, 83, 0);
    border-bottom-color: #55545436;

    overflow-y: hidden;

    margin-bottom: 1%;
    `
export const ListAnswerDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 2%;
    //margin-left: 2%;
    font-size: large;
    label {
        margin-bottom: 0px !important;
    }
    i {
        padding-right: 10px;
    }
    .txt {
        font-size: small;
        padding: 1%;
        width: 100%;
        margin-bottom: 0%;
    }
    .form-check {
        width: 50px;
        margin-left: 0px;
        display: flex;
        justify-content: center;
    }
    .radio {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`
export const TitleCadQuestion = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-right: 5px;
    `

    