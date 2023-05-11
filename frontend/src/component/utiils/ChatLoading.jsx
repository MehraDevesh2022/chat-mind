import { Stack } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/skeleton";

const ChatLoading = () => {
  return (
    <Stack bg="#28293D">
      {[...Array(12)].map((_, index) => (
        <Skeleton key={index} height="45px" />
      ))}
    </Stack>
  );
};

export default ChatLoading;
