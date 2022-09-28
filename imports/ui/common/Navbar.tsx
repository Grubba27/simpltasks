import { Box, Button, Flex, hope, Stack, useColorMode, useColorModeValue, Text } from "@hope-ui/solid";

const GradientText = hope(Text, {
  baseStyle: {
    background: "linear-gradient(to left, #675AAA, #4399E1)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    fontFamily: "heading",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: "$xl",
  }
})
export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box>
      <Flex
        bg={ useColorModeValue('white', '$neutral8') }
        color={ useColorModeValue('$neutral6', '$neutral9') }
        minH="60px"
        py="$2"
        px="$4"
        borderBottom="1px solid $neutral6"
        justifyContent="space-between"
        align="center"
      >
        <Flex flex={ { base: 1 } } justifyContent="start">
          <GradientText>
            Simpl Tasks
          </GradientText>
        </Flex>

        <Stack
          flex={ { base: 1, md: 0 } }
          justifyContent="flex-end"
          direction="row"
          spacing="6"
        >
          <Button
            onClick={ toggleColorMode }
            aria-label={ colorMode() === 'light' ? 'Dark' : 'Light' }
          >
            { colorMode() === 'light' ? 'Dark' : 'Light' }
          </Button>
        </Stack>
      </Flex>
    </Box>
  )
}
