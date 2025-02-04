export interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
}

export interface QuestionProps {
  question: string;
  answers: string[];
  onAnswer: (answer: string) => void;
}
