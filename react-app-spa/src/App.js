import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="flex flex-col">
      <main className="flex-grow p-10">
        <Outlet />
      </main>
    </div>
  );
}
