import React, { useState } from "react"
import { Box, Flex, keyframes } from "@chakra-ui/react"

import { FaRegCopy } from "react-icons/fa"
import { FaCheckCircle } from "react-icons/fa"
import useWindowDimensions from "../hooks/useWindowDimensions"

interface CopyBtnProps {
    valueToCopy: string
}

const CopyBtn: React.FC<CopyBtnProps> = ({ valueToCopy }) => {
    const [isCopying, setIsCopying] = useState<boolean>(false)
    const { width } = useWindowDimensions()

    const fade = keyframes` 0% {opacity: 1;} 70%  {opacity: 1;} 100% {opacity: 0}`
    const fadeAnimation = `${fade} infinite 2s linear`

    const handleCopyClick = () => {
        if (isCopying) {
            return
        }
        setIsCopying(true)
        navigator.clipboard.writeText(valueToCopy)

        setTimeout(() => {
            setIsCopying(false)
        }, 2000)
    }

    return isCopying ? (
        <Flex
            animation={fadeAnimation}
            as="span"
            color="pri.orange"
            content="center"
            alignItems="center"
            gap={1}
            fontSize="sm"
            fontWeight="semibold"
        >
            <FaCheckCircle size={16} />
            {width > 992 ? "Copied!" : null}
        </Flex>
    ) : (
        <Box
            as="span"
            color="gray.400"
            transition="all"
            transitionDuration={"0.3s"}
            sx={{
                ":hover ": {
                    color: "gray.500",
                },
            }}
        >
            <FaRegCopy size={16} onClick={() => handleCopyClick()} cursor={"pointer"} />
        </Box>
    )
}

export default CopyBtn
