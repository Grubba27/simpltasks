import { z } from "zod";
import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-zod";
import { Button, FormControl, FormErrorMessage, Input, InputGroup, VStack } from "@hope-ui/solid";

export default function TasksForm() {
  const schema = z.object({
    description: z.string(),
  });

  const { form, errors, isValid } = createForm<z.infer<typeof schema>>({
    extend: validator({ schema }),
    onSubmit: (values, context) => {
      const description = values.description.trim();
      Meteor.call('insertTask', { description }, err => {
        if (err) {
          errors().description = err?.reason || 'Sorry, please try again.';
        } else {
          context.reset()
        }
      });
    },
  });

  return (
    <VStack as="form"
            ref={ form } >
      <FormControl required invalid={ !!errors("email") }>
        <InputGroup>
          <Input h="2.6rem"
                 pr="6rem"
                 type="text"
                 name="description"
                 placeholder="Type to add new tasks"/>
          <Button h="2.5rem"
                  size="sm"
                  type="submit"
                  colorScheme="primary">Add Task</Button>
        </InputGroup>
        <FormErrorMessage>{ errors("description")[0] }</FormErrorMessage>
      </FormControl>
    </VStack>
  )
}
