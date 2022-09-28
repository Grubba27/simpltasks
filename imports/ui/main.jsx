/* @refresh reload */
import { render } from 'solid-js/web';
import { App } from './App';
import { Router } from "@solidjs/router";
import { Meteor } from "meteor/meteor";

function Application() {
  return (
    <Router>
      <App />
    </Router>
  )
}

Meteor.startup(() => {
  render(() => <Application/>, document.getElementById('root'));
})
