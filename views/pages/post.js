import React from 'react'
import Link from 'next/link'
import Main from '../layouts/main'
import fetch from 'isomorphic-fetch'
import common from '../common'
import postStyle from '../styles/post.scss'

export default class extends React.Component {
  constructor (props) {
    super(props)
  }

  static async getInitialProps ({req, query}) {
    const url = common.setQS(common.getAbsoluteUrl(req, '/data/post'), query)
    const res = await fetch(url)
    const json = await res.json()
    return {
      data: json
    }
  }

  render () {
    const data = this.props.data
    return (
      <Main>
        <style dangerouslySetInnerHTML={{__html: postStyle}}></style>
        <div className="post">
          <h1>{data.title}</h1>
          <p className="post-info">
            <span>作者：{data.author.name.first} {data.author.name.last}</span>
            <span>
              分类：
              {
                data.categories.map((item, index) =>{
                  return (
                    <Link href={`/bolg?category=${item.key}`} as={`/bolg/${item.key}`} key={index}>
                      <a>{item.name}</a>
                    </Link>
                  )
                })
              }

            </span>
          </p>
          <div className="post-content" dangerouslySetInnerHTML={{__html: data.content.extended}}></div>
        </div>
      </Main>
    )
  }
}
