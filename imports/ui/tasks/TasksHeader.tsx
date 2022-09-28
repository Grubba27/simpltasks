import { Box, Heading, hope, Stack, Text } from "@hope-ui/solid";

const GradientText = hope(Text, {
  baseStyle: {
    background: "linear-gradient(to left, #675AAA, #4399E1)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  }
})
export default function TasksHeader() {

  return (
    <Stack as={ Box } alignSelf="center" justifyContent="center" letterSpacing="$wide" mt="$16" p={ { base: 10 } }>
      <Heading size="4xl" height={ 100 }>
        <GradientText>
          Simple Tasks
        </GradientText>
      </Heading>
    </Stack>
  )
}
