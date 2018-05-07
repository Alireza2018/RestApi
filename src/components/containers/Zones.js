import React, { Component } from 'react'
import Zone from '../presentation/Zone'

import superagent from 'superagent'

class Zones extends Component {
  constructor() {
    super()
    this.state = {
      zone: {
        name: '',
        zipCode: ''
      },
      list: []
    }
  }

  componentDidMount() {
    superagent
      .get('/api/zone')
      .query(null)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if(err) {
          alert('ERROR: ' + err)
          return
        }
        let results = response.body.results
        let zone = Object.assign({}, this.state.zone)

        this.setState({
          list: results
        })
      })
  }

  onChange(e) {

    let updatedZone = Object.assign({}, this.state.zone)
    updatedZone[e.target.id] = e.target.value

    this.setState({
      zone: updatedZone
    })
  }

  onSubmit(e) {
    e.preventDefault()

    let updatedList = Object.assign([], this.state.list)
    updatedList.push(this.state.zone)
    this.setState({
      list: updatedList
    })
  }


  render() {

    const listItem = this.state.list.map((zone, i) => {
      return(
        <li key={i}><Zone currentZone={zone}/></li>
      )
    })

    return (
      <div>
        <ol>{listItem}</ol>

        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" className="form-control" onChange={this.onChange.bind(this)} id="name" placeholder="Name" /><br />
          <input type="text" className="form-control" onChange={this.onChange.bind(this)} id="zipCode" placeholder="Zip Code"/><br />
          <button className="btn btn-danger">Add Zone</button>
        </form>
      </div>
    )
  }
}

export default Zones
