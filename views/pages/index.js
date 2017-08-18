import React from 'react'
import Main from '../layouts/main'
import indexStyle from '../styles/index.scss'

export default class extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
  }

  render () {
    return (
      <Main>
        <style dangerouslySetInnerHTML={{__html: indexStyle}}></style>
        <div className="index">
          <div>This is Home</div>
        </div>
      </Main>
    )
  }
}
