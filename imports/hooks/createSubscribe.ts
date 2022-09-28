import { createSignal } from "solid-js";
import { Tracker } from "meteor/tracker";

export const createSubscribe =
  (name: string, ...args: any) => {
    const [signal, setSignal] =
      createSignal<Meteor.SubscriptionHandle>(undefined);
    Tracker.autorun(() => {
      if (args == undefined) {
        setSignal(Meteor.subscribe(name));
      } else {
        setSignal(Meteor.subscribe(name, ...args));
      }
    })

    return signal
  }
