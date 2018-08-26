import React from 'react'
import {Button, Form, Loader, Select} from 'semantic-ui-react'

import {baseUri, items} from '../utils'

class Item extends React.Component {
  state = {
    url: null,
    data: null,
    loading: false,
    message: null
  }

  responseScrapping = async () => {
    try {
      this.setState({loading: true})
      const response = await fetch(baseUri)
      const {url, data} = await response.json()
      this.setState({url, data, loading: !this.state.loading})
    } catch (err) {
      this.setState({
        message: 'Ops! application is crashed! 😔',
        loading: false
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Form>
          <Form.Group widths="equal">
            <Form.Select options={items} />
            {!this.state.loading ? (
              <Form.Button
                primary
                onClick={this.responseScrapping}
                disabled={this.state.loading}
              >
                Scrapping data!
              </Form.Button>
            ) : (
              <Loader active inline>
                Loading ...{' '}
              </Loader>
            )}
          </Form.Group>
        </Form>
        {this.state.data && JSON.stringify(this.state.data)}
        {this.state.message && <h3>{this.state.message}</h3>}
      </React.Fragment>
    )
  }
}

export default Item
