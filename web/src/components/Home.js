import React from 'react'
import {Container, Message} from 'semantic-ui-react'
import View from './View'

const containerStyle = {
  marginTop: '50px',
  width: '40%'
}

const messageStyle = {
  padding: '30px 0'
}

const Home = () => (
  <Container textAlign="center" style={containerStyle}>
    <Message floating style={messageStyle}>
      <h2>Puppeteer Scrapping!</h2>
    </Message>
    <View />
  </Container>
)

export default Home
