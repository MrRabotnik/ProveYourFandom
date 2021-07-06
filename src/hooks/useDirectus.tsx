import { useEffect, useState } from 'react'

// TODO: Probably should be derived elsewhere and passed in to this hook.
// Changes to query should be reflected in EvergreenData interface def.
const GRAPHQL_QUERY = `
  query {   
    challenges(limit: 3, filter: { status: { _eq: "published" } }) {
      id
      title
      keyart {
        id
      }
      questions {
        questions_id {
          text
          type
          answers {
            answers_id {
              text
              correct
              value            
            }
          } 
        }
      }
    }
  }
`

// Changes to query should be reflected in interface def(s).
export interface ChallengeData {
  id: string,
  title: string,
  keyart: { id: string },
  questions: {
    questions_id: {
      text: string,
      type: 'normal' | 'easy' | 'hard' | 'lifestyle',
      answers: {
        answers_id: {
          text: string,
          correct: boolean,
          value: number | null,
        }
      }[],
    }
  }[]
}

export interface EvergreenData {
  data: {
    challenges: ChallengeData[],
  }
}

function useDirectus(url : string) : [EvergreenData | undefined, () => void, boolean] {
  const [data, setData] = useState<EvergreenData>()
  const [isLoading, setIsLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState(Date.now())

  useEffect(() => {
    setIsLoading(true)
    fetchGraphQl(url, GRAPHQL_QUERY)
      .then((data) => {
        setData(data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
      })
  }, [lastRefresh, url])

  function refresh () {
    const now = Date.now()
    // Infinite loops/DDoS attempts were caused in the past, so a throttle
    // probably is a good idea.
    if (now - lastRefresh <= 1000) {
      console.warn('Last data refresh attempt ignored, too soon!', now - lastRefresh)
      return
    }
    setIsLoading(true)
    setLastRefresh(Date.now())
  }
  return [data, refresh, isLoading]
}

async function fetchGraphQl (url: string, query: string) : Promise<EvergreenData> {
  const ACCESS_TOKEN = process.env.API_ACCESS_TOKEN

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query,
    }),
  })
  return await (resp.ok ? resp.json() : Promise.reject(`GraphQL error: [${resp.status}] ${resp.statusText}`))
}

export default useDirectus
