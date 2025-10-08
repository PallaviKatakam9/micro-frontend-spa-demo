import { lazy, useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Wrap a remote Module Federation component for React.lazy
 * Handles both default and nested default exports
 * @param {Function} loader - Function returning import('remote/module')
 * @returns React.lazy component
 */
export default function ReactWrapper(loader) {
  return lazy(async () => {
    const module = await loader();

    // Try to get the component from common patterns
    let Component = module?.default;

    // Handle nested default: { default: Component }
    if (Component?.default) {
      Component = Component.default;
    }

    if (!Component || (typeof Component !== "function" && typeof Component !== "object")) {
      throw new Error(
        "Remote module does not export a valid React component. Received: " +
        JSON.stringify(module)
      );
    }

    // ✅ Wrap with useLocation to force re-render on route changes
    const WrappedComponent = (props) => {
      const location = useLocation(); // triggers re-render on path change

      useEffect(() => {
        return () => {
          if (typeof module.unmount === "function") {
            try {
              module.unmount();
            } catch (err) {
              console.warn("Error during remote unmount:", err);
            }
          }
        };
      }, [location.pathname]);
      return <Component key={location.pathname} {...props} />;
    };

    return { default: WrappedComponent };
  });
}