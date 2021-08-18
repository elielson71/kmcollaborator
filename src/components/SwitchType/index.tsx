import { useEffect, useState } from "react";
import { typeAnswer } from "../Interface";

export  const SwitchType = (type: string, answer: typeAnswer,setAnswers:React.Dispatch<React.SetStateAction<typeAnswer[]>>) => {
    switch (type) {
        case "R": return (
            <div className="form-check">
                <input
                    defaultValue=""
                    className="form-check-input"
                    type="radio" name='correta' id="flexRadioDefault1"
                    onChange={() =>  alert(answer.id_respostas)}
                    checked={answer.correta==='S'}
                />
            </div>
        );
        case "C": return (
            <div className="form-check">
                <input
                    className="form-check-input"
                    defaultValue=""
                    type="checkbox"
                    id="flexCheckIndeterminate"
                    name='correta'
                    onChange={e => setAnswers(prev => prev.map(item => item.id_respostas == answer.id_respostas ? { ...item, correta: e.target.checked?'S':'N' } : item))}
                    checked={answer.correta==='S'}
                />
            </div>)
        default: return false;
    }
}
