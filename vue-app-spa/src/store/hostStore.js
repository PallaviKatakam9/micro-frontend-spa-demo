import { reactive } from "vue";

let reduxStore;

// Reactive mirror of host Redux state
export const hostState = reactive({});

export async function initHostStore() {
  if (!reduxStore) {
    const mod = await import("host_app/reduxStore");
    reduxStore = mod.store || mod.default; // named export from host

    // Initialize reactive state
    Object.assign(hostState, reduxStore.getState());

    // Subscribe to Redux updates
    reduxStore.subscribe(() => {
      Object.assign(hostState, reduxStore.getState());
    });

  }

  return reduxStore;
}
// Dispatch actions to host Redux store
export function dispatchToHost(action) {
  if (reduxStore) {
    reduxStore.dispatch(action);
  } else {
    console.warn('Host Redux store not loaded yet');
  }
}
