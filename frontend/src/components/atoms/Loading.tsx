import "./loading-spinner.css";

export default function Loading() {
  return (
    <div className="flex flex-row gap-x-2 font-mono font-bold border-black border-2 justify-center items-center">
      {/* Loading spinner container */}
      <span className="mt-2">
        <div id="loading-spinner">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </span>
      Loading Todos.... Please wait
    </div>
  );
}
