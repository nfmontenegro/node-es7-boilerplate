import React from 'react'
import {Form} from 'semantic-ui-react'

import {baseUri, items} from '../utils'

class Item extends React.Component {
  state = {
    loading: false,
    product: 'iphonex'
  }

  handleChange = event => {
    this.setState({
      product: event.target.value
    })
  }

  handleSubmit = async () => {
    try {
      this.setState({
        loading: true,
        url: null,
        data: null,
        message: null
      })

      const response = await fetch(`${baseUri}/${this.state.product}`)
      const {data, url} = await response.json()

      this.setState({
        url,
        data,
        loading: !this.state.loading,
        message: null
      })
    } catch (err) {
      this.setState({
        message: 'Ops! application is crashed! 😔',
        url: null,
        data: null,
        loading: false
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Form loading={this.state.loading} size={'small'}>
          <Form.Group style={{width: '100%'}}>
            <select value={this.state.product} onChange={this.handleChange}>
              {items.map(({text, value}) => (
                <option key={value + 1} value={value}>
                  {text}
                </option>
              ))}
            </select>
            <Form.Button
              primary
              onClick={this.handleSubmit}
              disabled={this.state.loading}
              width={6}
            >
              Go!
            </Form.Button>
          </Form.Group>
        </Form>
        {this.state.data && JSON.stringify(this.state.data)}
        {this.state.message && <h3>{this.state.message}</h3>}
      </React.Fragment>
    )
  }
}

export default Item
