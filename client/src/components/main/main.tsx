import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import Api from '../../api/Api';
import { Dispatch } from 'redux';
import { UPDATE_USER_DISPATCH } from '../../actions/types'

export interface MainProps {
    user: {
        name: string;
        score: number;
    }
    updateUserDispatch: Function
}
interface Question {
    _id: string;
    questionTitle: string;
    answers: Answer[]
}
interface Answer {
    _id: string;
    answerTitle: string;
}
const Main: React.FC<MainProps> = (props) => {
    const [questions, setQuestions] = useState<Question[]>([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [answerValue, setAnswerValue] = useState<string | null>(null)
    const [submit, setSubmit] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            const result = await Api.get("/questions");
            if (result.data) {
                setQuestions(result.data)
            }
        };
        fetchData();
    }, [])

    const handleClickBtn = async () => {
        if (answerValue) {
            const { data: { correct } } = await Api.get(`/questions/${questions[currentQuestionIndex]._id}/answers/${answerValue}`)
            if (correct) {
                props.updateUserDispatch({ name: props.user.name, score: props.user.score + 2 })
            }
            setCurrentQuestionIndex(prev => prev + 1)
        }
    }

    const handleSubmit = async () => {
        const { data: { correct } } = await Api.get(`/questions/${questions[currentQuestionIndex]._id}/answers/${answerValue}`)
        if (correct) {
            props.updateUserDispatch({ name: props.user.name, score: props.user.score + 2 })
        }
        setSubmit(true)
    }

    const handleRadioChange = async (event: any) => {
        const inpVal = event.target.value
        setAnswerValue(inpVal)
    }

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            {
                questions.length
                    && !submit ? (
                        <Card style={{ width: '50rem', margin: '0px auto' }}>
                            <Card.Body>
                                <Card.Title style={{ color: "blueviolet" }}>Question Number {currentQuestionIndex + 1}</Card.Title>
                                <Card.Title>
                                    {questions[currentQuestionIndex].questionTitle}
                                </Card.Title>
                                <ul className="list-group">
                                    {questions[currentQuestionIndex].answers.map((answer: Answer) => {
                                        return (
                                            <li key={answer._id} className="list-group-item">
                                                <div className="custom-control custom-radio">
                                                    <input type="radio" className="custom-control-input" name="customRadio" value={answer._id} id={answer._id} onChange={handleRadioChange} />
                                                    <label className="custom-control-label" htmlFor={answer._id}>
                                                        {answer.answerTitle}
                                                    </label>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <br />
                                {
                                    questions.length == currentQuestionIndex + 1 ?
                                        <Button onClick={handleSubmit}>submit</Button> : <Button onClick={handleClickBtn} variant="primary">Next</Button>}
                            </Card.Body>
                        </Card>
                    ) : (
                        <div>
                            {
                                questions.length &&
                                    submit ? (
                                        <div>
                                            name: {props.user.name}
                                            <br />
                                            score: {props.user.score}
                                        </div>
                                    ) : (
                                        <div>
                                            loading
                                        </div>
                                    )
                            }
                        </div>
                    )
            }

        </div>
    );
}


const mapStateToProps = (state: any) => ({
    user: state.user
})
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateUserDispatch: (updateUserData: any) => { dispatch({ type: UPDATE_USER_DISPATCH, payload: updateUserData }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);