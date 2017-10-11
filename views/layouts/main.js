import Router from 'next/router'
import Head from 'next/head'
import Header from '../components/header'
import NProgress from 'nprogress'
import layoutStyle from '../styles/common/layout.scss'


Router.onRouteChangeStart = (url) => {
  NProgress.start();
}
Router.onRouteChangeComplete = (url) => {
  NProgress.done();
}


export default class extends React.Component {

  render () {
    return (
      <div>
        <Head>
          <title>Chen的博客</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
        </Head>
        <Header/>
        <style dangerouslySetInnerHTML={{__html: layoutStyle}}></style>
        {this.props.children}
      </div>
    )
  }
}
