import TaskItem from "./TaskItem";
import { Box, Button, HStack, Spinner, Stack, useColorModeValue, Text } from "@hope-ui/solid";
import { createSignal, For } from "solid-js";

const TaskItems =
  ({
     tasks,
     pendingCount,
     hideDone,
     setHideDone,
     isLoading,
   }) => {
    const [benchmark, setBenchmark] = createSignal({
      time: 0,
      random: 0,
    });
    const editTask = async (id) => {
      const t1 = performance.now();
      let r = 0
      try {
        r = await Meteor.callAsync('simpleComputation', id);
      } catch (e) {
        console.log(e);
      }
      const t2 = performance.now();
      console.log(`Call to updateTask took ${ t2 - t1 } milliseconds.`);
      setBenchmark({
        time: t2 - t1,
        random: r
      })
    }
    return (
      <Box
        mt="$8"
        py="$4"
        px="$4"
        pb="$4"
        borderWidth="1px"
        borderColor="$neutral6"
        borderRadius="$lg"
      >
        <HStack mt="$2">
          <Box w="70%">
            <Text
              as="span"
              color="$neutral9"
              fontSize="$sm"
            >
              You have { tasks().length } { tasks().length === 1 ? 'task ' : 'tasks ' }
              and { pendingCount() || 0 } pending.
            </Text>
            <Text
              as="span"
              color="$neutral9"
              fontSize="$sm"
            >
              time: { benchmark().time } random: { benchmark().random }
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
                        onEdit={ taskId => editTask(taskId) }
                        onMarkAsDone={ taskId => Meteor.call('toggleTaskDone', { taskId }) }
                        onDelete={ taskId => Meteor.call('removeTask', { taskId }) }/>
            }
          </For>
        ) }
      </Box>
    )
  }

export default TaskItems

