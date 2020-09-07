import React, { Fragment, useState } from "react";
import "./App.css";
import QuestionCard from "./components/QuestionCard";
import { Difficulty, fetchQuizQuestions, QuestionState } from "./api";

const TOTAL_QUESTIONS = 10;

export type answerObj = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<answerObj[]>([]);
  const [score, setScore] = useState(0);
  const [gameOveer, setGameOveer] = useState(true);

  const startTrivia = async () => {
    console.log('calling')
    setLoading(true);
    setGameOveer(false);

    try {
      const newQuestion = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      );
      setQuestions(newQuestion);
      setScore(0);
      setLoading(false);
      setNumber(0);
      setUserAnswer([]);
    } catch (err) {
      console.log("err :>> ", err);
    }
  };

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    const answer = event.currentTarget.value
    const correct = questions[number].correct_answer === answer

    console.log('answer, correct :>> ', answer, correct);

    if(correct) setScore(prevScore => prevScore + 1)
    const answerObj = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer
    }

    setUserAnswer(prev => [...prev, answerObj])
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1
    if(nextQuestion === TOTAL_QUESTIONS) {
      setGameOveer(true)
    } else {
      setNumber(nextQuestion)
    }
  };

  return (
    <Fragment>
      <h1>React Quiz</h1>
      {gameOveer || userAnswer.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}
      {!gameOveer ? <p className="score">Score: {score}</p> : null}
      {loading && <p className="loading">loading...</p>}
      {!loading && !gameOveer && (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answer={questions[number].answers}
          userAnswer={userAnswer ? userAnswer[number] : undefined}
          callBack={checkAnswer}
        />
      )}
      {!gameOveer &&
      !loading &&
      userAnswer.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </Fragment>
  );
}

export default App;
