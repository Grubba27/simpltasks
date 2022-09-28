import { createSignal } from "solid-js";
import { Tracker } from "meteor/tracker";
import SubscriptionHandle = Meteor.SubscriptionHandle;


export const createSubscribe =
  (name: string, ...args: any) => {
    const [signal, setSignal] = createSignal<SubscriptionHandle>(undefined);
    if (args == undefined) {
      setSignal(Meteor.subscribe(name));
    } else {
      setSignal(Meteor.subscribe(name, ...args));
    }
    Tracker.autorun(() => {
      if (args == undefined) {
        setSignal(Meteor.subscribe(name));
      } else {
        setSignal(Meteor.subscribe(name, ...args));
      }
    })

    return signal
  }
