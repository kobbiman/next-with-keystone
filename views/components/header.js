import React from 'react'
import Link from 'next/link'

export default class extends React.Component {
  render () {
    return (
      <header>
        <nav>
          <Link prefetch href="/">
            <a>主页</a>
          </Link>
          <Link prefetch href="/bolg">
            <a>博客</a>
          </Link>
        </nav>
      </header>
    )
  }
}
