import React from 'react'
import Link from 'next/link'
import Main from '../layouts/main'
import fetch from 'isomorphic-fetch'
import { uri } from '../common'
import bolgStyle from '../styles/bolg.scss'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.totalCategory = this.totalCategory.bind(this)
  }

  static async getInitialProps ({ req, query }) {
    const url = uri.setQS(uri.getAbsoluteUrl(req, '/data/bolg'), query)
    const res = await fetch(url)
    const json = await res.json()
    return {
      data: json
    }
  }

  getPosts () {
    const data = this.props.data.Posts.results
    return data.map((item, index) => {
      return this.getPostItem(item, index)
    })
  }

  getCategory () {
    const data = this.props.data.PostCategory
    return data.map((item, index) => {
      return this.getCategoryItem(item, index)
    })
  }

  getCategoryItem (item, index) {
    const category = this.props.url.query.category
    return (
      <div key={index}>
        <Link href={`/bolg?category=${item.key}`} as={`/bolg/${item.key}`}>
          <a className={category == item.key ? 'active' : ''}>{item.name}</a>
        </Link>
      </div>
    )
  }

  getPostItem (item, index) {
    return (
      <div key={index} className="bolg-item">
        <h3>
          <Link href={`/post?id=${item.id}`} as={`/post/${item.id}`}>
            <a>
              {item.title}
            </a>
          </Link>
        </h3>
        <div dangerouslySetInnerHTML={{__html: item.content.brief}}></div>
        <p>作者：{item.author.name.first} {item.author.name.last}</p>
      </div>
    )
  }

  totalCategory () {
    this.setState({
      isShow: !(this.state && this.state.isShow)
    })
  }

  getHeight () {
    return `${(this.props.data.PostCategory.length + 1) * 22 + 48}px`
  }

  render () {
    const category = this.props.url.query.category
    return (
      <Main>
        <style dangerouslySetInnerHTML={{__html: bolgStyle}}></style>
        <div className={`bolg ${(this.state && this.state.isShow) ? 'active' : ''}`}>
          <button className="category-button" onClick={this.totalCategory}>分类</button>
          <div
            className={`category`}
            style={{height: (this.state && this.state.isShow) ? this.getHeight() : 0}}>
            <h2> </h2>
            <div className="category-list">
              <div>
                <Link href="/bolg">
                  <a className={category ? '' : 'active'}>全部</a>
                </Link>
              </div>
              { this.getCategory() }
            </div>
          </div>
          <div className="posts">
            <h2>帖子</h2>
            <div>
              { this.getPosts() }
            </div>
          </div>
        </div>
      </Main>
    )
  }
}
