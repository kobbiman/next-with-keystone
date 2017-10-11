import React from 'react'
import Link from 'next/link'
import Main from '../layouts/main'
import fetch from 'isomorphic-fetch'
import { uri } from '../common'
import postStyle from '../styles/post.scss'


export default class extends React.Component {
  constructor (props) {
    super(props)
    // this.addComment = this.addComment.bind(this)
  }

  static async getInitialProps ({req, query}) {
    const url = uri.setQS(uri.getAbsoluteUrl(req, '/data/post'), query)
    const res = await fetch(url)
    const json = await res.json()
    return {
      data: json
    }
  }

  // async addComment (ev) {
  //   ev.preventDefault()
  //   const res = await fetch(ev.target.action, {
  //     method: ev.target.method,
  //     body: new FormData(ev.target)
  //   })
  //   console.log(res);
  // }

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
        {/* <div className="comments">
          <h3 className="comments-title">评论</h3>
          <div className="comments-list">{
            data.comments.map((item, index) => {
              const name = item.author.name
              return (
                <div className="comments-item" key={index}>
                  <label className="comments-user">
                    {name ? `${name.first} ${name.last}` : item.user}
                  </label>: {item.content}
                </div>
              )
            })
          }</div>
          <div className="comments-add">
            <form action="/data/addcomment" method="POST" onSubmit={this.addComment}>
              <div>
                <label>内容</label><textarea name="content"></textarea>
              </div>
              <div>
                <label>姓名</label><input type="text" name="user"/>
              </div>
              <div>
                <button>send</button>
              </div>
            </form>
          </div>
        </div> */}
      </Main>
    )
  }
}
