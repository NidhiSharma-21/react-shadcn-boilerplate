

import Authpage from '../src/pages/AuthPage'
import UiErrorHandler from './utils/UiErrorHandler'
import Layout from './layout/layout'
export default function App() {
  return (
    <Layout>
      <UiErrorHandler>
        <Authpage />
      </UiErrorHandler>
    </Layout>
  )
}