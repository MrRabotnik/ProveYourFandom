export interface Transitionable {
  transitionState: string,
}

export interface ChallengeContent {
  title: string,
  keyArt: string,
  questions: QuestionSpec[],
}

export interface QuestionSpec {
  text: string,
  answers: AnswerSpec[],
  correct?: boolean,
  type: 'lifestyle' | 'normal'
}

export interface AnswerSpec {
  text: string,
  correct: boolean,
  picked?: boolean,
  value: number | null,
}
