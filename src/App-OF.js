import { OpenFeatureProvider, useBooleanFlagValue, OpenFeature } from '@openfeature/react-sdk';
import DevCycleProvider from '@devcycle/openfeature-web-provider'

await OpenFeature.setContext({ user_id: 'USER_ID', isAnonymous: false })
await OpenFeature.setProviderAndWait(new DevCycleProvider('<DVC_SDK_KEY>'));

const App = () => {
    return (
        <OpenFeatureProvider>
            <Page></Page>
        </OpenFeatureProvider>
    )
}

const Page = () => {
    const newMessage = useBooleanFlagValue('boolean-flag', false)
    return (
        <div className="App">
            <header className="App-header">
                {newMessage ? <p>Welcome to this OpenFeature-enabled React app!</p> : <p>Welcome to this React app.</p>}
            </header>
        </div>
    )
}

export default App
