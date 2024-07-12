import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { defaultClient } from "../../casper-client"
import { Box, Flex, Text, VStack } from "@chakra-ui/react"
import useWindowDimensions from "../hooks/useWindowDimensions"
import { useIsMobileContext } from "../../context/isMobileContext"
import JsonView from "@uiw/react-json-view"
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/react"
import { truncateToXSymbols } from "../utils"

import DeployDetailsCeil from "../atoms/deploy-details-ceil"

const DeployDetails = () => {
    const { deployHash } = useParams()
    const { width } = useWindowDimensions()
    const { isMobile } = useIsMobileContext()

    const [deployInfo, setDeployInfo] = useState<any>()

    const setTruncateLength = () => {
        if (width === 0 && isMobile) {
            return 5
        } else if (width !== 0) {
            if (width <= 480) {
                return 10
            }
            if (width <= 768) {
                return 15
            }
        }
        return 0
    }

    // We use casper-js-sdk to get more info about Deploy (based on deploy hash that is taken from endpoint http://localhost:3001/cache/events/${nodeNumber} )
    useEffect(() => {
        const fetchInfo = async () => {
            try {
                let info
                if (deployHash) {
                    info = await defaultClient.casperService.getDeployInfo(deployHash)
                    setDeployInfo(info)
                }
            } catch (error) {
                console.error("Error fetching latest block info:", error)
            }
        }
        fetchInfo()
        // eslint-disable-next-line
    }, [])

    if (!deployInfo) {
        return (
            <Flex justifyContent="center" height="calc(100vh - 148px)" alignItems="center">
                <Box overflowY="auto" p={3}>
                    <Flex w="100%" justify="center" mt={["144px", "144px", "0"]}>
                        <Text color="grey.400">No details info available to display</Text>
                    </Flex>
                </Box>
            </Flex>
        )
    }

    return (
        <Flex width="100%" justifyContent="center" mt={["138px", "148px", "80px"]}>
            <VStack
                w="100%"
                maxW={1440}
                p={["8px 16px", "8px 16px", "16px 32px"]}
                gap={0}
                align={"left"}
            >
                <Flex
                    as={Link}
                    to="/deploys"
                    alignSelf={"left"}
                    p={"12px 0px"}
                    color={"pri.orange"}
                    fontWeight={"semibold"}
                    _hover={{ color: "red.600" }}
                >
                    {"<- "}
                    Deploys
                </Flex>
                {deployInfo ? (
                    <Box w="full">
                        <VStack gap="8px" align={"left"}>
                            <DeployDetailsCeil
                                title="Timestamp"
                                value={deployInfo.deploy.header.timestamp}
                            />
                            <DeployDetailsCeil
                                title="Deploy Hash"
                                value={
                                    deployHash
                                        ? truncateToXSymbols(deployHash, setTruncateLength())
                                        : "-"
                                }
                                copyable
                                hash={deployHash}
                            />
                            <DeployDetailsCeil
                                title="Account Hash"
                                value={truncateToXSymbols(
                                    deployInfo.deploy.header.account,
                                    setTruncateLength()
                                )}
                                copyable
                                hash={deployInfo.deploy.header.account}
                            />
                            <DeployDetailsCeil
                                title="Body Hash"
                                value={truncateToXSymbols(
                                    deployInfo.deploy.header.body_hash,
                                    setTruncateLength()
                                )}
                                copyable
                                hash={deployInfo.deploy.header.body_hash}
                            />
                            <DeployDetailsCeil
                                title="Chain Name"
                                value={deployInfo.deploy.header.chain_name}
                            />
                        </VStack>
                    </Box>
                ) : null}
                <Accordion allowToggle w="full">
                    <AccordionItem>
                        <AccordionButton w="full" bgColor={"grey.50"}>
                            <Text as="span" flex="1" textAlign="left" fontWeight="semibold">
                                Raw Data
                            </Text>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel p={0}>
                            <Box w="full" p={4} bgColor="#f5f5f5">
                                <JsonView
                                    value={deployInfo}
                                    displayDataTypes={false}
                                    collapsed={5}
                                    shortenTextAfterLength={0}
                                />
                            </Box>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </VStack>
        </Flex>
    )
}

export default DeployDetails
