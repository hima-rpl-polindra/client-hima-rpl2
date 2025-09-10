import { HashLoader } from "react-spinners";

export default function Spinner() {
  return (
    <>
      <div className="flex items-center justify-center h-screen w-full">
        <HashLoader size={50} color="#ffd60a" />
      </div>
    </>
  );
}
