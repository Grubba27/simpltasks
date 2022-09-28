import { Accounts } from "meteor/accounts-base";

const addUser = ({ username, password }) => {
  Accounts.createUser({ username, password }, error => {
    throw error
  });
}
Meteor.methods(
  {
    addUser
  }
)
