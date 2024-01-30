import {
    useDevCycleClient, useIsDevCycleInitialized, useVariableValue, withDevCycleProvider
} from '@devcycle/react-client-sdk'

const App = () => {
    // the useIsDevCycleInitialized hook allows you to block rendering of your application until SDK initialization is complete
    const devcycleReady = useIsDevCycleInitialized()

    const newUser = {
        user_id: 'new_user_id'
    }
    // with your root component wrapped in withDevCycleProvider, you can use the useDevCycleClient hook to access the DevCycle client from anywhere in your app
    const devcycleClient = useDevCycleClient()
    const identifyUser = () => {
        devcycleClient.identifyUser(newUser)
            .then((variables) => console.log('Updated Variables:', variables))
    }

    // use the useVariableValue hook to access the value of your DevCycle variables inside your components
    const booleanFlagValue = useVariableValue('boolean-flag', false)

    if (!devcycleReady) return <div><h1>DevCycle is not ready! Loading State...</h1></div>

    return (
        <>
            <button onClick={() => identifyUser()}>Identify new user</button>
            <div>
                {booleanFlagValue ? <div>Variable on!</div> : <div>Variable off</div>}
            </div>
        </>
    )
}

// wrap your root component with the withDevCycleProvider higher-order component to initialize the SDK
export default withDevCycleProvider({
    sdkKey: 'dvc_client_ffa8d74e_2b12_4293_9aff_3386dc7da259_bec00cc',
    user: { user_id: 'USER_ID', isAnonymous: false }
})(App)
