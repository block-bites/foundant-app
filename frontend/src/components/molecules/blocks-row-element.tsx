import React from "react"
import { Flex, VStack, Text } from "@chakra-ui/react"
import { truncateToXSymbols } from "../utils"
import useWindowDimensions from "../hooks/useWindowDimensions"

import CopyBtn from "../atoms/copy-btn"

interface BlockRowElementProps {
    height: number
    era: number
    deploys: number
    age: string
    blockHash: string
}

export default function BlockRowElement({
    height,
    era,
    deploys,
    age,
    blockHash,
}: BlockRowElementProps) {
    const { width } = useWindowDimensions()

    const fontSize = {
        base: "12px",
        sm: "15px",
        lg: "15px",
        xl: "15px",
        "2xl": "15px",
    }

    const setTruncateLength = () => {
        if (width === 0) {
            return 5
        } else if (width !== 0) {
            if (width <= 680) {
                return 18
            }
            if (width <= 768) {
                return 28
            }
            if (width <= 940) {
                return 12
            }
            if (width <= 1260) {
                return 20
            }
        }
        return 0
    }

    return (
        <Flex
            w="100%"
            h={["120px", "160px", "94px"]}
            borderBottom="1px solid"
            borderBottomColor="grey.100"
            justify="left"
            align="center"
            p={["0 16px 0 0", "0 16px 0 0", "0 16px 0 0", "0 32px 0 0", "0"]}
        >
            <VStack
                background="#00800033"
                p={["8px 16px", "8px 16px", "8px 32px"]}
                h="100%"
                justify="center"
                align="center"
            >
                <Text fontSize={fontSize} lineHeight="tall" fontWeight="normal" color="grey.border">
                    HEIGHT
                </Text>
                <Text fontSize={fontSize} lineHeight="tall" fontWeight="normal" color="grey.border">
                    {height.toString()}
                </Text>
            </VStack>
            <Flex
                direction={["column", "column", "row"]}
                gap={["10px", "16px", "10px"]}
                m={["0 0 0 16px", "0 0 0 16px", "unset"]}
            >
                <Flex gap={["12px", "24px", "10px", "10px", "10px"]}>
                    <VStack
                        align={["left", "left", "center"]}
                        minWidth={"6vw"}
                        gap={["2px", "3px", "10px"]}
                    >
                        <Text fontSize={fontSize} fontWeight="normal" whiteSpace="nowrap">
                            ERA
                        </Text>
                        <Text fontSize={fontSize} fontWeight="semibold">
                            {era.toString()}
                        </Text>
                    </VStack>
                    <VStack align="center" minWidth={"9.5vw"} gap={["2px", "3px", "10px"]}>
                        <Text fontSize={fontSize} fontWeight="normal">
                            DEPLOYS
                        </Text>
                        <Text fontSize={fontSize} fontWeight="semibold">
                            {deploys.toString()}
                        </Text>
                    </VStack>
                    <VStack align="left" minWidth={"20vw"} gap={["2px", "3px", "10px"]}>
                        <Text fontSize={fontSize} fontWeight="normal">
                            AGE
                        </Text>
                        <Text fontSize={fontSize} fontWeight="semibold" whiteSpace="nowrap">
                            {age}
                        </Text>
                    </VStack>
                </Flex>
                <VStack
                    align="right"
                    width={"100%"}
                    gap={["3px", "3px", "10px"]}
                    m={["0", "0", "0 0 0 10px"]}
                >
                    <Text fontSize={fontSize} fontWeight="normal" align="left">
                        BLOCK HASH
                    </Text>
                    <Flex alignItems="center" gap={2}>
                        <Text fontSize={fontSize} fontWeight="semibold" align="left">
                            {truncateToXSymbols(blockHash, setTruncateLength())}
                        </Text>
                        <CopyBtn valueToCopy={blockHash} />
                    </Flex>
                </VStack>
            </Flex>
        </Flex>
    )
}
