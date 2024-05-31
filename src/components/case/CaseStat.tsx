import { IoIosDocument } from "react-icons/io";

type CaseStatProps = {
  total_documents: number;
  processing: number;
  average_relevancy: number;
};

export default function CaseStat({
  total_documents,
  processing,
  average_relevancy,
}: CaseStatProps) {
  return (
    <>
      <section className="grid gap-6 md:grid-cols-3  my-4 max-w-5xl mx-auto w-full ">
        <div className="p-6 bg-white shadow rounded-2xl border border-black">
          <dl className="space-y-2">
            <dt className="text-sm font-medium text-black">Total Documents</dt>

            <dd className="text-5xl font-light md:text-6xl text-black">
              {total_documents}
            </dd>

            <dd className="flex items-center space-x-1 text-sm font-medium text-black">
              <span className="text-black">Documents Read for Rachel</span>
            </dd>
          </dl>
        </div>

        <div className="p-6 bg-white shadow rounded-2xl border border-black">
          <dl className="space-y-2">
            <dt className="text-sm font-medium text-black">Processing</dt>

            <dd className="text-5xl font-light md:text-6xl text-black">
              {processing}
            </dd>
            <dd className="flex items-center space-x-1 text-sm font-medium text-black">
              <span className="text-black">Documents Rachel is Reading</span>
            </dd>
          </dl>
        </div>

        <div className="p-6 bg-white shadow rounded-2xl border border-black">
          <dl className="space-y-2">
            <dt className="text-sm font-medium text-black">
              Average document relevancy
            </dt>

            <dd className="text-5xl font-light md:text-6xl text-black">
              {average_relevancy}
            </dd>

            <dd className="flex items-center space-x-1 text-sm font-medium text-black">
              <span className="text-black">Relevancy Still in Beta</span>
            </dd>
          </dl>
        </div>
      </section>
    </>
  );
}
