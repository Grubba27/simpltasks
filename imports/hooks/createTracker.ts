import { createEffect, createSignal } from "solid-js";
import { Tracker } from "meteor/tracker";

export const createTracker =
  <T>(reactiveFn: () => T) => {
    const [signal, setSignal] = createSignal<T>(undefined);

    Tracker.autorun(() => {
      setSignal(reactiveFn);
    })

    createEffect(() => {
      setSignal(reactiveFn);
    })
    return signal
  }
