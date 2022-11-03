import { createEffect, createSignal } from "solid-js";
import { TasksCollection } from "../../../api/tasks/tasks.collection";
import TasksHeader from "./TasksHeader";
import TasksForm from "./TasksForm";
import TaskItems from "./TaskItems";
import { createTracker } from "../../hooks/createTracker";
import { createSubscribe } from "../../hooks/createSubscribe";
import { Box, Flex, hope } from "@hope-ui/solid";
import Navbar from "../common/Navbar";


/* eslint-disable import/no-default-export */
const Main = hope((Box), {
  baseStyle: {
    maxWidth: "$6xl",
    mx: "auto",
  }
})
export default function TasksPage() {
  const [hideDone, setHideDone] =
    createSignal(false);

  const filter =
    () => hideDone() ? { done: { $ne: true } } : {};

  const search =
    () => TasksCollection.find(filter(), { sort: { createdAt: -1 } }).fetch();

  const tasks =
    createTracker(() => search())

  const pendingCount =
    createTracker(() => TasksCollection.find({ done: { $ne: true } }).count())

  const isLoading =
    createSubscribe('tasks')

  return (
    <>
      <Navbar/>
      <Main as="main">
        <TasksHeader/>
        <TasksForm/>
        <TaskItems tasks={ tasks }
                   hideDone={ hideDone }
                   setHideDone={ setHideDone }
                   pendingCount={ pendingCount }
                   isLoading={ isLoading().ready() }/>
      </Main>
    </>

  );
}


