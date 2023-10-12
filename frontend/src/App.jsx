import { CreateUser } from './components/CreateUser'
import { ShowUsers } from './components/ShowUsers'
import { Dashboard } from './components/Dashboard'
import Nav from './common/Nav'
import { Route, Routes } from 'react-router-dom'
import NewTransaction from './components/new_transactions/NewTransaction'
import Branches from './components/Branches'
import Services from './components/Services'
import Discounts from './components/Discounts'
import Settings from './components/Settings'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import Chart1 from './components/Chart1'
import Chart2 from './components/Chart2'
import Chart3 from './components/Chart3'
import React, { useEffect } from 'react'
// import DiscountedAmountFilter from './components/DiscountedAmountFilter'
// import SalesByServiceType from './components/SalesByServiceType'

function App() {
    return (
        <>
            <Nav />
            <Routes>
                <Route path="/home" element={<Home />} />
                {/* <Route path="/home" element={<SalesByServiceType />} /> */}

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/new-transaction" element={<NewTransaction />} />
                <Route path="/booking" element={<NewTransaction />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/branches" element={<Branches />} />
                <Route path="/services" element={<Services />} />
                <Route path="/discounts" element={<Discounts />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/users" element={<ShowUsers />} />
                {/* <Route path="/users" element={<Users />} /> */}
            </Routes>
        </>
    )
}

export default App
