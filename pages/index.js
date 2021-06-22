/* eslint-disable @next/next/no-html-link-for-pages */
import dynamic from 'next/dynamic'
import Head from 'next/head'
// import Feed from '../components/Feed'
// import MainHeader from '../components/MainHeader'
// import Sidebar from '../components/Sidebar'
// import Widget from '../components/Widget'
const Login = dynamic(
  () => import('../components/Login'),
  { ssr: false }
)
// import {db} from '../firebase'
import { auth } from '../firebase'

export default function Home({ user }) {
  if (!user) return <Login />

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Facebook</title>
      </Head>

      {/* <MainHeader /> */}

      <main className="flex">
        {/* <Sidebar /> */}
        {/* <Feed posts={posts} /> */}
        {/* <Widget /> */}
        <h4>Hello</h4>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  // const posts = await db.collection('posts').orderBy('timestamp', 'desc').get()

  // const docs = posts.docs.map((post) => ({
  //   id: post.id,
  //   ...post.data(),
  //   timestamp: null,
  // }))

  let user = null
  auth.onAuthStateChanged((u) => (user = u ? u : null))

  return {
    // props: { posts: docs },
    props: { user },
  }
}
