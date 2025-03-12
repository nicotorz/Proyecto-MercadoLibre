import Api from "../../services/api";
import { useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import ArrowResponse from "../../assets/icons/arrowResponse.svg";
import Toast from "react-native-toast-message";

const QuestionComponent = ({ questions, onChangeQuestions, isOwner, user}) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState({});
  const { id } = useLocalSearchParams();

  const handleAddQuestion = () => {
    if (question.trim()) {
      Api.addQuestion(id, { text: question })
      .then((response) => {
        Toast.show({
          type: 'success',
          text1: 'Pregunta agregada con exito!',
          position: 'top',
          autoHide: true,
          visibilityTime: 3000
        });
        onChangeQuestions(response.question);
        setQuestion("");
    }).catch((error) => {
      Toast.show({
        type: 'error',
        text1: 'Ocurrio un erro al agregar la pregunta!',
        position: 'top',
        autoHide: true,
        visibilityTime: 3000
      });
    });
  }
  };

  const handleAddAnswer = (questionId) => {
    if (answers[questionId]?.trim()) {
      Api.addAnswer(id, questionId, {text: answers[questionId]})
      .then((response)=>{
        Toast.show({
          type: 'success',
          text1: 'Respuesta agregada con exito!',
          position: 'top',
          autoHide: true,
          visibilityTime: 3000
        });
        const updatedQuestions = questions.map((q) => {
          if (q.id === questionId) {
            return { ...q, response: answers[questionId] };
          }
          return q;
        });
        onChangeQuestions(updatedQuestions);
        setAnswers((prevAnswers) => ({...prevAnswers,[questionId]: '', }));
      })
      .catch((error)=> {
        Toast.show({
          type: 'error',
          text1: 'Ocurrio un error al agregar la respuesta',
          position: 'top',
          autoHide: true,
          visibilityTime: 3000
        });
      });
    }
  };

  const handleInputChange = (text, questionId) => {
    setAnswers(prevAnswers => ({...prevAnswers,[questionId]: text, }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Questions</Text>

      <View style={styles.askSection}>
        <TextInput
          placeholder="Deja tu pregunta"
          value={question}
          style={styles.input}
          onChangeText={setQuestion}
        />
        <Pressable style={styles.askButton} onPress={handleAddQuestion} disabled={!user || isOwner}>
          <Text style={styles.askButtonText}>Ask</Text>
        </Pressable>
      </View>

      <View style={styles.lastQuestionsSection}>
        <Text style={styles.subHeader}>Last questions</Text>
        {questions.length === 0 ? (
          <Text style={styles.noQuestionsText}>
            Este producto no tiene preguntas
          </Text>
        ) : (
          questions.map((item) => (
            <View key={item.id} style={styles.questionContainer}>
              <Text style={styles.questionText}>{item.txt}</Text>

              {item.response ? (
                <View style={styles.responseContainer}>
                  <Text style={styles.responseText}>
                    <ArrowResponse /> {item.response}
                  </Text>
                </View>
              ) : (
                isOwner && (
                  <View style={styles.answerInputContainer}>
                    <Text style={styles.arrowResponse}>
                      <ArrowResponse />
                    </Text>
                    <TextInput
                      style={styles.input}
                      value={answers[item.id] || ""}
                      onChangeText={(text) => handleInputChange(text, item.id)}
                      placeholder="Escribe tu respuesta"
                    />
                    <View style={styles.butonContainer}>
                      <Pressable
                        style={styles.askButton}
                        onPress={() => handleAddAnswer(item.id)}
                      >
                        <Text style={styles.askButtonText}>Responder</Text>
                      </Pressable>
                    </View>
                  </View>
                )
              )}
            </View>
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f8f8f8",
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  askSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  askButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  askButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  lastQuestionsSection: {
    marginTop: 16,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  noQuestionsText: {
    fontSize: 16,
    color: "#666",
  },
  questionContainer: {
    marginBottom: 16,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 4,
  },
  responseContainer: {
    paddingLeft: 16,
  },
  responseText: {
    fontSize: 14,
    color: "#555",
  },
  arrowResponse: {
    fontSize: 14,
    marginBottom: 4,
  },
  answerInputContainer: {
    marginTop: 8,
    paddingLeft: 16,
  },
  butonContainer: {
    marginTop: 8,
  },
});

export default QuestionComponent;
