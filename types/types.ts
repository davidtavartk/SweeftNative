export interface QuestionType {
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
}

export interface CategoryType {
  id: number;
  name: string;
}
