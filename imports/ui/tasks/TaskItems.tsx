import TaskItem from "./TaskItem";
import { Box, Button, HStack, Spinner, Stack, useColorModeValue, Text } from "@hope-ui/solid";
import { For } from "solid-js";

const TaskItems =
  ({
     tasks,
     pendingCount,
     hideDone,
     setHideDone,
     isLoading,
   }) => {
    return (
      <Box
        mt={ 8 }
        py="$4"
        px="$4"
        pb="$4"
        borderWidth="1px"
        borderColor="$neutral6"
        borderRadius="$lg"
      >
        <HStack mt={ 2 }>
          <Box w="70%">
            <Text
              as="span"
              color={ useColorModeValue('gray.600', 'gray.400') }
              fontSize="xs"
            >
              You have { tasks().length } { tasks().length === 1 ? 'task ' : 'tasks ' }
              and { pendingCount() || 0 } pending.
            </Text>
          </Box>
          <Stack w="30%" justifyContent="flex-end" direction="row">
            <Button
              bg="$success9"
              color="white"
              colorScheme="teal"
              size="xs"
              onClick={ () => setHideDone(!hideDone()) }
            >
              { hideDone() ? 'Show All Tasks' : 'Show Pending' }
            </Button>
          </Stack>
        </HStack>
        { isLoading ? (
          <Spinner/>
        ) : (
          <For each={ tasks() }>
            { task =>
              <TaskItem task={ task }
                        onMarkAsDone={ taskId => Meteor.call('toggleTaskDone', { taskId }) }
                        onDelete={ taskId => Meteor.call('removeTask', { taskId }) }/>
            }
          </For>
        ) }
      </Box>
    )
  }

export default TaskItems
