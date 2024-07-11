import React from "react"
import { HStack, Text } from "@chakra-ui/react"

import CopyBtn from "../atoms/copy-btn"

interface DeployDetailsCeilProps {
    title: string
    value: string
    copyable?: boolean
    hash?: string
}

const DeployDetailsCeil: React.FC<DeployDetailsCeilProps> = ({ title, value, copyable, hash }) => {
    return (
        <HStack w="100%" gap="15px" borderBottom="1px solid" borderBottomColor="gray.100" p="8px">
            <Text fontSize="md" color="grey.300" fontWeight={500} minW="120px">
                {title}
            </Text>
            <Text fontSize="sm" fontWeight="semibold" color="gray.800">
                {value}
            </Text>
            {copyable && hash ? <CopyBtn valueToCopy={hash} /> : null}
        </HStack>
    )
}

export default DeployDetailsCeil
