import { check } from 'meteor/check';
import { TasksCollection } from './tasks.collection';
import { Meteor } from 'meteor/meteor';
import { checkLoggedIn } from '../common/auth';

/**
 * Insert a task for the logged user.
 * @param {{ description: String }}
 * @throws Will throw an error if user is not logged in.
 */
const insertTask = ({ description }) => {
  check(description, String);
  // checkLoggedIn();
  TasksCollection.insert({
    description,
    createdAt: new Date(),
    done: false
  });
};

/**
 * Check if user is logged in and is the task owner.
 * @param {{ taskId: String }}
 * @throws Will throw an error if user is not logged in or is not the task owner.
 */
const checkTaskOwner = ({ taskId }) => {
  check(taskId, String);
  //checkLoggedIn();
  const task = TasksCollection.findOne({
    _id: taskId,
    userId: Meteor.userId(),
  });
  if (!task) {
    throw new Meteor.Error('Error', 'Access denied.');
  }
};

/**
 * Remove a task.
 * @param {{ taskId: String }}
 * @throws Will throw an error if user is not logged in or is not the task owner.
 */
export const removeTask = ({ taskId }) => {
  //checkTaskOwner({ taskId });
  TasksCollection.remove(taskId);
};

/**
 * Toggle task as done or not.
 * @param {{ taskId: String }}
 * @throws Will throw an error if user is not logged in or is not the task owner.
 */
const toggleTaskDone = ({ taskId }) => {
  //checkTaskOwner({ taskId });
  const task = TasksCollection.findOne(taskId);
  TasksCollection.update({ _id: taskId }, { $set: { done: !task.done } });
};
const sleep = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));
/**
 * Register task API methods.
 */
Meteor.isServer && Meteor.methods({
  insertTask,
  removeTask,
  toggleTaskDone,
  simpleComputation: async function (_id) {
    await sleep(500)
    await TasksCollection.updateAsync({ _id }, { $set: { done: true } });
    await sleep(500)
    await sleep(200)
    await TasksCollection.removeAsync({ _id });
    return Math.floor(Math.random() * 100);
  },
  shouldWorkComputations: function (_id) {
    sleep(300).then(() => {
      TasksCollection.update({ _id }, { $set: { done: true } });
    })
    sleep(1000).then(() => {
      TasksCollection.remove({ _id });
    })
  },
  expensiveComputation: async function (_id) {
    Meteor.call('updateTask', _id)
    Meteor.call('removeSlowTask', _id)
    return Math.floor(Math.random() * 100);
  },
  expensiveComputationDoesNotWork: async function (_id) {
    await Meteor.call('updateTask', _id)
    await Meteor.call('removeSlowTask', _id)
    return Math.floor(Math.random() * 100);
  },
  removeSlowTask: async function (_id) {
    await sleep(200)
    TasksCollection.removeAsync({ _id });
  },
  'updateTask': async function (_id) {
    await sleep(500)
    TasksCollection.updateAsync({ _id }, { $set: { done: true } });
  }
});
