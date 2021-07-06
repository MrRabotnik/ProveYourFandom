import styled from 'styled-components'
import { MODES, setMode } from './App'

interface iMenu {
  setMode: setMode
}
function Attract({ setMode }: iMenu) {
  return (
    <Container onClick={() => setMode(MODES.GAME)}>
      <Video
        autoPlay
        loop
        src={'./public/content/video/attract.mp4'}
      />
    </Container>
  )
}

export default Attract

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
