

import Authpage from '../src/pages/AuthPage'
import { Toaster } from "./components/ui-custom/toaster/toaster"
import UiErrorHandler from './utils/UiErrorHandler'
import Layout from './layout/layout'
export default function App() {
  return (
    <Layout>
      <UiErrorHandler>
        <Toaster />
        <Authpage />
      </UiErrorHandler>
    </Layout>
  )
}