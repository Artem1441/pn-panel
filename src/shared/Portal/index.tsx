import { memo, useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Portal = memo(({ children }: any) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted ? ReactDOM.createPortal(children, document.body) : null;
});

export default Portal;
