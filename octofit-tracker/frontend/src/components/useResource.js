import { useEffect, useState } from 'react'

export function useResource(resource, fetchResource) {
  const [state, setState] = useState({ data: [], loading: true, error: '' })

  useEffect(() => {
    let active = true
    fetchResource(resource)
      .then((data) => active && setState({ data, loading: false, error: '' }))
      .catch((error) => active && setState({ data: [], loading: false, error: error.message }))
    return () => { active = false }
  }, [resource, fetchResource])

  return state
}