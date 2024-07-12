import React, { useState, createContext, useContext, ReactNode } from "react"

// Define the shape of the context
interface IsMobileContextType {
    isMobile: boolean
    setIsMobile: React.Dispatch<React.SetStateAction<boolean>>
}

// Create the context
export const IsMobileContext = createContext<IsMobileContextType | undefined>(undefined)

// Define the props for IsNetworkLaunchedProvider component
interface IsMobileProps {
    children: ReactNode
}

// IsMobileProvider component
export const IsMobileProvider: React.FC<IsMobileProps> = ({ children }) => {
    const [isMobile, setIsMobile] = useState<boolean>(false)

    return (
        <IsMobileContext.Provider value={{ isMobile, setIsMobile }}>
            {children}
        </IsMobileContext.Provider>
    )
}

// Hook to use the IsMobileContext
export const useIsMobileContext = () => {
    const context = useContext(IsMobileContext)
    if (!context) {
        throw new Error("useNodeContext must be used within a NodeProvider")
    }
    return context
}
