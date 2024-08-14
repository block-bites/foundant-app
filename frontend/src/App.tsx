import { useState, useEffect } from "react"
import { SearchProvider } from "./context/SearchContext"
import { NodeProvider } from "./context/NodeContext"
import { HelmetProvider } from "react-helmet-async"

import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { fondantTheme } from "./styles/theme"

import Navbar from "./components/organisms/navbar"
import Accounts from "./components/pages/accounts"
import Blocks from "./components/pages/blocks"
import Logs from "./components/pages/logs"
import Settings from "./components/pages/settings"
import Events from "./components/pages/events"
import Deploys from "./components/pages/deploys"
import DeployDetails from "./components/pages/deploy-details"

import { NODE_URL_PORT } from "./constant"
import {
    IsNetworkRunningProvider,
    useIsNetworkRunningContext,
} from "./context/IsNetworkRunningContext"
import { IsMobileProvider, useIsMobileContext } from "./context/isMobileContext"
import {
    IsNetworkLaunchedProvider,
    useIsNetworkLaunchedContext,
} from "./context/IsNetworkLaunchedContext"
import useWindowDimensions from "./components/hooks/useWindowDimensions"

export const App = () => {
    return (
        <NodeProvider>
            <HelmetProvider>
                <ChakraProvider theme={fondantTheme}>
                    <IsNetworkLaunchedProvider>
                        <IsNetworkRunningProvider>
                            <IsMobileProvider>
                                <SearchProvider>
                                    <Router>
                                        <AppContent />
                                    </Router>
                                </SearchProvider>
                            </IsMobileProvider>
                        </IsNetworkRunningProvider>
                    </IsNetworkLaunchedProvider>
                </ChakraProvider>
            </HelmetProvider>
        </NodeProvider>
    )
}
type Deploy = any

function AppContent() {
    const location = useLocation()
    const isSettingsPage = location.pathname === "/settings"
    const { width } = useWindowDimensions()
    const [isLaptop, setIsLaptop] = useState<boolean>(false)
    const { setIsMobile } = useIsMobileContext()
    const { setIsNetworkRunning } = useIsNetworkRunningContext()
    const { isNetworkLaunched, setIsNetworkLaunched } = useIsNetworkLaunchedContext()
    const [deploys, setDeploys] = useState<Deploy[]>([])

    useEffect(() => {
        setIsLaptop(width >= 768 && width < 1024)
        setIsMobile(width < 768)
        // eslint-disable-next-line
    }, [width])

    useEffect(() => {
        checkStatus()
        // eslint-disable-next-line
    }, [])

    const checkStatus = async () => {
        try {
            const response = await fetch(`${NODE_URL_PORT}/status`)
            const resJson = await response.json()
            if (response.ok) {
                if (resJson.message === "") {
                    console.log("Network status: NOT LAUNCHED")
                    setIsNetworkLaunched(false)
                    setIsNetworkRunning(false)
                }
                if (resJson.message === "running") {
                    console.log("Network status: RUNNING")
                    setIsNetworkLaunched(true)
                    setIsNetworkRunning(true)
                }
                if (resJson.message === "stopped") {
                    console.log("Network status: STOPPED")
                    setIsNetworkLaunched(true)
                    setIsNetworkRunning(false)
                }
            }
        } catch (error) {
            setIsNetworkRunning(false)
            setIsNetworkLaunched(false)
            console.error("Error fetching system status:", error)
        }
    }

    return (
        <>
            {!isSettingsPage && <Navbar isLaptop={isLaptop} />}
            <Routes>
                <Route path="/" element={<Accounts isNetworkLaunched={isNetworkLaunched} />} />
                <Route path="/blocks" element={<Blocks />} />
                <Route
                    path="/deploys"
                    element={<Deploys deploys={deploys} setDeploys={setDeploys} />}
                />
                <Route path="/deploys/:deployHash" element={<DeployDetails />} />
                <Route path="/events" element={<Events />} />
                <Route path="/logs" element={<Logs />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}
