import { Route, Routes } from "@solidjs/router";
import NotFoundPage from "./common/NotFoundPage";
import TasksPage from "./tasks/TasksPage";


export const RoutePaths = {
  ROOT: '/',
  TASKS: '/tasks',
};

export function AppRouting() {
  return (
    <Routes>
      <Route path={ RoutePaths.ROOT } component={ <TasksPage/> }/>
      <Route path="*" component={ <NotFoundPage/> }/>
    </Routes>
  )
}
