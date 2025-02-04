import { Colors } from "@/constants/Colors";
import { QuestionProps } from "@/types/propTypes";
import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

const Question = ({ question, answers, onAnswer }: QuestionProps) => (
  <View>
    <Text style={styles.questionText}>{question}</Text>
    <FlatList
      data={answers.sort()}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onAnswer(item)}
          style={styles.answerButton}
        >
          <Text>{item}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  answerButton: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    margin: 10,
    borderRadius: 8,
  },
  questionText: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Question;
