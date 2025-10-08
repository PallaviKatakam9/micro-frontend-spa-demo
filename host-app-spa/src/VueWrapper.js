import { useEffect, useRef } from "react";
import { createApp, h } from "vue";
import { useLocation } from "react-router-dom";

export default function VueWrapper({ loader, base }) {
  const ref = useRef(null);
  const appRef = useRef(null);
  const location = useLocation();

  useEffect(() => {

    window.__MICRO_FRONTEND_BASE__ = base || "/";

    const mountVue = async () => {

      const module = await loader(); // call loader function

      // ✅ Unmount previous app if exists
      if (appRef.current && typeof appRef.current.unmount === "function") {
        appRef.current.unmount();
        appRef.current = null;
      }
     
      // ✅ Remote should export a mount function
      if (module.mountApp) {
        appRef.current =  await module.mountApp(ref.current, base);
      } 
      // fallback for directly exported component (no router)
      else {
        const Comp = module.default || module;
        appRef.current = createApp({ render: () => h(Comp) });
        appRef.current.mount(ref.current);
      }

    };

    mountVue();

    return () => {
       if (appRef.current && typeof appRef.current.unmount === "function") {
        appRef.current.unmount();
        appRef.current = null;
      }
    };
  }, [loader, base, location.pathname]); // remount on path change

  return <div ref={ref}></div>;
}
