import { Meteor } from 'meteor/meteor';
import { TasksCollection } from './tasks.collection';

Meteor.publish('tasks', function publishTasks() {
  const list = TasksCollection.find();
  return list.fetch() || [] ;
});
