import { Flex, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { Link } from "react-router-dom"
import { truncateToXSymbols } from "../utils"
import useWindowDimensions from "../hooks/useWindowDimensions"

interface DeployRowElementProps {
    deploy: any
    isMobile: boolean
}

const DeployRowElement: React.FC<DeployRowElementProps> = ({ deploy, isMobile }) => {
    const { width } = useWindowDimensions()

    const setTruncateLength = () => {
        if (width === 0 && isMobile) {
            return 5
        } else if (width !== 0) {
            if (width <= 680) {
                return 5
            }
            if (width <= 940) {
                return 10
            }
            if (width <= 1200) {
                return 15
            }
        }
        return 20
    }

    return (
        <Link to={`${deploy.DeployProcessed.deploy_hash}`}>
            <Flex
                w="100%"
                borderBottom="1px solid"
                borderBottomColor="grey.100"
                justify="left"
                gap="10px"
                transition={"0.3s"}
                _hover={{ bg: "grey.50" }}
                p={["12px 24px", "12px 24px", "12px 24px", "16px 32px", "16px 32px"]}
            >
                <VStack align="left" w="100%" gap="5px">
                    <Text fontSize="md" color="grey.300" fontWeight={500}>
                        Deploy Hash
                    </Text>
                    <Text fontSize="sm" fontWeight="semibold" color="grey.800">
                        {truncateToXSymbols(
                            deploy.DeployProcessed.deploy_hash,
                            setTruncateLength()
                        )}
                    </Text>
                </VStack>
                <VStack align="left" w="100%" gap="5px">
                    <Text fontSize="md" color="grey.300" fontWeight={500}>
                        Account hash
                    </Text>
                    <Text fontSize="sm" fontWeight="semibold" color="grey.800">
                        {truncateToXSymbols(deploy.DeployProcessed.account, setTruncateLength())}
                    </Text>
                </VStack>
                <VStack align="left" w="100%" gap="5px">
                    <Text fontSize="md" color="grey.300" fontWeight={500}>
                        Timestamp
                    </Text>
                    <Text fontSize="sm" fontWeight="semibold" color="grey.800">
                        {deploy.DeployProcessed.timestamp}
                    </Text>
                </VStack>
            </Flex>
        </Link>
    )
}

export default DeployRowElement
