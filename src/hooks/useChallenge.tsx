import { useState, useCallback } from 'react'
import shuffle from 'shuffle-array'
import { ChallengeContent, QuestionSpec } from '../types'

export const BATCH_SIZE = 6

export const FALLBACK_CHALLENGE = {
  title: 'Data Error',
  keyArt: '',
  questions: [],
}

export default function useChallenge (content: ChallengeContent[], lifestyleRatio: number): [ChallengeContent, (name: string) => void] {
  const [challenge, setChallenge] = useState<ChallengeContent>(() => {
    if (content.length === 0) {
      return FALLBACK_CHALLENGE
    }
    const questionData = getGradeableBatch(content[0].questions, lifestyleRatio)
    const challenge = content[0]
    challenge.questions = questionData
    return challenge
  })

  const newBatch = useCallback((name) => {
    const chosen = content.find(challenge => challenge.title === name)
    if (!chosen) {
      console.error('Could not find challenge with name: ', name)
      return
    }

    const questionData = getGradeableBatch(chosen.questions, lifestyleRatio)
    const challenge = chosen

    const newChallenge: ChallengeContent = {
      title: challenge.title,
      keyArt: challenge.keyArt,
      questions: questionData,
    }

    challenge.questions = questionData
    setChallenge(newChallenge)
  }, [content, lifestyleRatio])

  return [challenge, newBatch]
}

/**
 * Create a shallow copy of question data with additional grading-specific data.
 *
 * Attempt to attain a desired "lifestyle" to "normal" question ratio.
 */
function getGradeableBatch (allQuestions: QuestionSpec[], lifestyleRatio: number) : QuestionSpec[] {
  let lifestyles = shuffle(allQuestions.filter((question) => {
    return question.type === 'lifestyle'
  }), {copy: true})
  let normal = shuffle(allQuestions.filter((question) => {
    return question.type === 'normal'
  }), {copy: true})


  const selectedLifeStyles = []
  const desiredLifestyle = Math.floor(lifestyleRatio * BATCH_SIZE)
  const lifestylePool = lifestyles.length
  for (let i = 0; i < lifestylePool && i < desiredLifestyle; i++) {
    const newQ = lifestyles.shift()
    if (newQ) {
      selectedLifeStyles.push(newQ)
    }
  }
  const shuffledLifestyles = shuffle(selectedLifeStyles, {copy: true})

  const selectedNormals = []
  const remainingSpots = BATCH_SIZE - selectedLifeStyles.length
  const normalPoolSize = normal.length
  for (let i = 0; i < remainingSpots && i < normalPoolSize; i++) {
    const newQ = normal.shift()
    if (newQ) {
      selectedNormals.push(newQ)
    }
  }
  const shuffledNormals = shuffle(selectedNormals, {copy: true})

  const shuffledQuestions = _mixQuestions(shuffledNormals, shuffledLifestyles)

  const questions = shuffledQuestions.map((data) => {
    const question = {
      text: data.text,
      answers: data.answers.map((answerData) => {
        return {
          correct: answerData.correct,
          text: answerData.text,
          value: answerData.value,
        }
      }),
      type: data.type,
    }
    shuffle(question.answers)
    return question
  })

  return questions
}

/**
 * Alternate normal and lifestyle questions.
 */
function _mixQuestions(normal: QuestionSpec[], lifestyles: QuestionSpec[]): QuestionSpec[] {

  const min = Math.min(normal.length, lifestyles.length)
  const result = []

  // Add pairs of altnerating question types
  for (let i = 0; i < min; i++) {
    result.push(normal[i], lifestyles[i])
  }

  // Fill in with any leftovers
  result.push(...normal.slice(min), ...lifestyles.slice(min))

  return result
}
