import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { CircularProgress } from '@material-ui/core';
import { ChatBubble } from '@material-ui/icons';

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      backgroundColor="#1C1C28"
      boxShadow="0 0 20px rgba(0, 0, 0, 0.5)"
      transform="translateZ(0)"
    >
      <Box display="flex" alignItems="center" marginRight={5}>
        <ChatBubble fontSize="large" color="primary" />
        <Text fontSize="lg" fontWeight="bold" color="white" marginLeft={2}>
          Loading...
        </Text>
      </Box>
      <CircularProgress color="primary" size={30} />
    </Box>
  );
};

export default Loader;
