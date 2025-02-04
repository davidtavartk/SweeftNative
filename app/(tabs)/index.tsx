import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Button from "@/components/Button/Button";
import Question from "@/components/Question/Question";
import { CategoryType, QuestionType } from "@/types/types";
import { fetchCategories, fetchQuestions } from "@/api";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [category, setCategory] = useState<string>("9");
  const [difficulty, setDifficulty] = useState<string>("easy");
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, []);

  const fetchQuestionsData = async () => {
    setLoading(true);
    try {
      const questionsData = await fetchQuestions(category, difficulty);
      setQuestions(questionsData);
      setCurrentQuestionIndex(0);
      setScore(0);
      setQuizFinished(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
    setLoading(false);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    fetchQuestionsData();
  };

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizStarted(false);
      setQuizFinished(true);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      {!quizStarted && !quizFinished ? (
        <View>
          <Text>Select Category:</Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            {categories.map((cat) => (
              <Picker.Item
                key={cat.id}
                label={cat.name}
                value={cat.id.toString()}
              />
            ))}
          </Picker>

          <Text>Select Difficulty:</Text>
          <Picker
            selectedValue={difficulty}
            onValueChange={(itemValue) => setDifficulty(itemValue)}
          >
            <Picker.Item label="Easy" value="easy" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="Hard" value="hard" />
          </Picker>

          <Button title="Start Quiz" onPress={startQuiz} />
        </View>
      ) : loading ? (
        <ActivityIndicator size="large" />
      ) : quizFinished ? (
        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 100,
            }}
          >
            Your Score: {score} / {questions.length}
          </Text>
          <Button
            title="Go to Main Page"
            onPress={() => setQuizFinished(false)}
            style={{ backgroundColor: Colors.green }}
          />
        </View>
      ) : (
        <Question
          question={questions[currentQuestionIndex]?.question}
          answers={[
            ...questions[currentQuestionIndex]?.incorrect_answers,
            questions[currentQuestionIndex]?.correct_answer,
          ]}
          onAnswer={handleAnswer}
        />
      )}
    </View>
  );
}
