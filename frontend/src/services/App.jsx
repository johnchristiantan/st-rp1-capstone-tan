import { useEffect, useState } from 'react'
import { ShowUsers } from './components/ShowUsers'
import { Dashboard } from './components/Dashboard'
import { Route, Routes } from 'react-router-dom'
import NewTransaction from './components/new_transactions/NewTransaction'
import Branches from './components/Branches'
import Services from './components/Services'
import Discounts from './components/Discounts'
import Settings from './components/Settings'
// import Home from './components/Home'
import LoginForm from './authentication/LoginForm'
import PageNotFound from './common/PageNotFound'
import Redirect from './common/Redirect'

let userToken = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')).token
    : null

function App() {
    const [jwt, setJwt] = useState(userToken)

    // Reload if jwt changes
    useEffect(() => {
        console.log('JWT: ', jwt)
    }, [jwt])

    return (
        <>
            <Routes>
                {jwt ? (
                    <>
                        <Route
                            path="/dashboard"
                            element={<Dashboard setJwt={setJwt} />}
                        />
                        <Route
                            path="/booking"
                            element={<NewTransaction setJwt={setJwt} />}
                        />
                        <Route
                            path="/branches"
                            element={<Branches setJwt={setJwt} />}
                        />
                        <Route
                            path="/services"
                            element={<Services setJwt={setJwt} />}
                        />
                        <Route
                            path="/discounts"
                            element={<Discounts setJwt={setJwt} />}
                        />
                        <Route
                            path="/settings"
                            element={<Settings setJwt={setJwt} />}
                        />
                        <Route
                            path="/users"
                            element={<ShowUsers setJwt={setJwt} />}
                        />
                        <Route
                            path="/"
                            element={<Redirect setJwt={setJwt} />}
                        />
                        <Route
                            path="/profile"
                            element={<Redirect setJwt={setJwt} />}
                        />
                    </>
                ) : (
                    <>
                        {/* <Route path="/" element={<Home />} /> */}
                        <Route
                            path="/"
                            element={<LoginForm setJwt={setJwt} />}
                        />
                        <Route path="/dashboard" element={<PageNotFound />} />
                        <Route path="/booking" element={<PageNotFound />} />
                        <Route path="/branches" element={<PageNotFound />} />
                        <Route path="/services" element={<PageNotFound />} />
                        <Route path="/discounts" element={<PageNotFound />} />
                        <Route path="/settings" element={<PageNotFound />} />
                        <Route path="/users" element={<PageNotFound />} />
                        <Route path="/profile" element={<PageNotFound />} />
                    </>
                )}
            </Routes>
        </>
    )
}

export default App
