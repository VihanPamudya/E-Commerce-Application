import React from "react"
import { Box, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function Logo(props) {
  return (
    <Box {...props}>
      <Text fontSize="24px" fontWeight="bold" color="#0EBE6F">
        <Link to={"/dashboard"}>E-Commerce</Link>
      </Text>
    </Box>
  )
}