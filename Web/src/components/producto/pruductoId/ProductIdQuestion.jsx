import { useParams } from "react-router-dom";
import { useState } from "react";
import './ProductIdQuestion.css';
import response from '../../../assets/response.svg';
import api from '../../../services/api';

const ProductIdQuestion = ({questions, onChangeQuestions, dueño, userFound }) => {

    const { id } = useParams()
    const [question, setQuestion] = useState('')
    const [answers, setAnswers] = useState('');
    const isOwner = userFound? dueño == userFound.name: false;
  
    const handleAddQuestion = () => {
        if (question.trim()) {
          const newQuestion = { id: questions.length + 1, user: userFound, txt: question, response:'' }
          onChangeQuestions([...questions, newQuestion]); 
          setQuestion(''); 
          api.addQuestion(id, {text: question});
        }
    };

    const handleAddAnswer = (questionId) => {
      if (answers?.trim()) {
          api.addAnswer(id, questionId, answers);
        }
        const updatedQuestions = questions.map((question) => {
          if (question.id === questionId) {
            return { ...question, response: answers };
          }
          return question;
        });
        onChangeQuestions(updatedQuestions);
        setAnswers(''); 
  };

    return (    
    
      <div className="productid-question-block">
        <h2 className="productid-title"> Preguntas </h2>
        <hr className="product-id-line"/>
        <div className="question-answer-block">
          <div className="question-contain">
              <div className="question-box">
                  <input className="text-box"
                         type="text" 
                         value={question}
                         onChange={(e) => setQuestion(e.target.value)}
                         placeholder="Deja tu pregunta"/>
              </div>
              <button className="add-button" 
                      onClick={handleAddQuestion}
                      disabled={!userFound || isOwner}> 
                Preguntar 
              </button>
          </div>
          <h3 className="title-questions"> Ultimas preguntas </h3>
          <div className="answer-contain">
            { questions.length === 0 ? (
              <p className="no-questions"> Este producto no tiene preguntas </p>
            ) : (
            questions.map((q) => (
            <div key={q.id} className="question-item">
              <p className="question-text"> {q.txt} </p>
              {q.response ? (
              <div key={q.id} className="answer-item">
                <img src={response} />
                <span className="answer-text"> {q.response} </span>
              </div>
              ) : (
              isOwner  && (
              <div className="answer-container">
                <img src={response} />
                <input className="text-box-answer"
                       type="text"
                       value={answers[q.id]}
                       onChange={(e) => setAnswers(e.target.value)}
                       placeholder="Escribe tu respuesta" />
                <button className="add-button" onClick={() => handleAddAnswer(q.id)}> Responder </button>
              </div>
              ))}
            </div>
            )))}
          </div>
        </div>
      </div>
    )
};
    
export default ProductIdQuestion