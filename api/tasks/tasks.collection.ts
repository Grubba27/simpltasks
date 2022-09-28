import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const TasksCollection = new Mongo.Collection('tasks');

const TasksSchema = new SimpleSchema({
  description: String,
  done: {
    type: Boolean,
    defaultValue: false,
  },
  userId: {
    type: String,
  },
  createdAt: Date,
});

export {
  TasksCollection,
};
