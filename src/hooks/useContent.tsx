import { useEffect, useState } from 'react'
import { EvergreenData, ChallengeData } from './useDirectus'
import { ChallengeContent } from '../types'

/**
 * Convert raw contentData into data structures required by the interactives.
 */
function useContent (contentData : undefined | EvergreenData) : [ChallengeContent[]] {
  const [challenges, setChallenges] = useState<ChallengeContent[]>([])

  useEffect(() => {
    if (!contentData || !contentData.data) return
    setChallenges(_parseChallengeData(contentData.data.challenges))
  }, [contentData])

  return [challenges]
}


const FILE_PATH = 'https://hbomax-archive-directus.attexp.com/assets'
function _parseChallengeData(data: ChallengeData[] | undefined) : ChallengeContent[] {
  if (!data) {
    console.warn('No challenge data to parse!')
    return []
  }

  return data.map((d) => {
    return {
      title: d.title,
      keyArt: getAssetPath(d.keyart.id),
      questions: d.questions.map((qd) => {
        return {
          text: qd.questions_id.text,
          answers: qd.questions_id.answers.map((ad) => {
            return {
              text: ad.answers_id.text,
              correct: ad.answers_id.correct,
              value: ad.answers_id.value,
            }
          }),
          type: qd.questions_id.type === 'lifestyle' ? 'lifestyle' : 'normal', // We are ignoring easy and hard concepts for now.
        }
      }),
    }
  })
}

function getAssetPath(id: string): string {
  return `${FILE_PATH}/${id}?access_token=${process.env.API_ACCESS_TOKEN}`
}

export default useContent
