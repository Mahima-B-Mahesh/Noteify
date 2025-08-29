import { ChakraProvider, Button } from "@chakra-ui/react";

export default function TestChakra() {
  return (
    <ChakraProvider>
      <Button colorScheme="blue">Hello Chakra</Button>
    </ChakraProvider>
  );
}
