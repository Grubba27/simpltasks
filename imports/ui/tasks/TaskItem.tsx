import { Box, Button, Checkbox, HStack, Stack } from "@hope-ui/solid";

export default function TaskItem({ task, onMarkAsDone, onDelete, onEdit }) {
  return (
    <HStack mt="$4">
      <Box w="80%">
        <Checkbox
          colorScheme="green"
          checked={task.done}
          onChange={() => onMarkAsDone(task._id)}
        >
          {task.description}
        </Checkbox>
      </Box>
      <Stack w="40%" justifyContent="flex-end" direction="row">
        <Button
          color="$yellow9"
          borderColor="$yellow9"
          variant="outline"
          size="xs"
          onClick={() => onEdit(task._id)}
        >
          Edit
        </Button>
        <Button
          color="$danger9"
          borderColor="$danger9"
          variant="outline"
          size="xs"
          onClick={() => onDelete(task._id)}
        >
          Remove
        </Button>
      </Stack>
    </HStack>
  )
}
