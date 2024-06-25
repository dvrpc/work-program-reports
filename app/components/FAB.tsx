import printIcon from "~/images/print.svg";

export default function FAB() {
  return (
    <div className="print:hidden max-w-[950px] w-full fixed bottom-12 flex flex-col gap-8 items-end">
      <a
        className="block rounded-full h-16 w-16 text-center text-white bg-blue-700 hover:bg-blue-800 shadow-material"
        onClick={() => window?.print()}
      >
        <img
          src={printIcon}
          alt="Download"
          width="32"
          height="32"
          className="inline align-middle pt-4"
          title="Download PDF"
        />
      </a>
    </div>
  );
}
