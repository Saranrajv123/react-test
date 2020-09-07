import React, { Fragment } from "react";
import {answerObj} from "../App"

type Props = {
  question: string;
  answer: string[];
  callBack: (event: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: answerObj | undefined;
  questionNumber: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = (props) => {
  console.log('props :>> ', props);
  return (
    <Fragment>
      <p className="num">
        {`Question: ${props.questionNumber} / ${props.totalQuestions}`}
      </p>
      {props.question}

      <div>
        {props.answer.map((item, index) => (
          <div key={index}>
            <button disabled={props.userAnswer ? true : false} value={item} onClick={props.callBack}>
              <span>{item}</span>
            </button>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default QuestionCard;
