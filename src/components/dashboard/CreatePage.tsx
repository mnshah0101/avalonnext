"use client";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function CreatePage() {
  const { data: session, status } = useSession();

  const [caseTitle, setCaseTitle] = useState("");

  const [caseInformation, setCaseInformation] = useState("");
  const [attorneyFirstName, setAttorneyFirstName] = useState("");
  const [attorneyLastName, setAttorneyLastName] = useState("");
  const [judge, setJudge] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(e: { preventDefault: () => void }) {
    if (status === "loading") return;
    try {
      setError("");
      setLoading(true);
      e.preventDefault();

      console.log({
        caseTitle,
        caseInformation,
        attorneyFirstName,
        attorneyLastName,
        judge,
        state,
        city,
        type,
      });

      if (
        caseTitle === "" ||
        caseInformation === "" ||
        attorneyFirstName === "" ||
        attorneyLastName === "" ||
        judge === "" ||
        state === "" ||
        city === "" ||
        type === ""
      ) {
        //list which fields are missing in the error message
        let missing = [];
        if (caseTitle === "") {
          missing.push("Case Title");
        }

        if (caseInformation === "") {
          missing.push("Case Information");
        }
        if (attorneyFirstName === "") {
          missing.push("Attorney First Name");
        }
        if (attorneyLastName === "") {
          missing.push("Attorney Last Name");
        }
        if (judge === "") {
          missing.push("Judge");
        }
        if (state === "") {
          missing.push("State");
        }
        if (city === "") {
          missing.push("City");
        }
        if (type === "") {
          missing.push("Type");
        }
        setError(`Please fill in all fields: ${missing.join(", ")}`);

        setLoading(false);
        return;
      }

      let response = await fetch(
        `${process.env.NEXT_PUBLIC_GO_URL}/createCase`,
        {
          method: "POST",
          body: JSON.stringify({
            _id: session?.user?.id,
            case_title: caseTitle,
            attorney_first_name: attorneyFirstName,
            attorney_last_name: attorneyLastName,
            case_info: caseInformation,
            case_type: type,
            city: city,
            date: new Date().toISOString(),
            judge_name: judge,
            state: state,
            user_id: session?.user?.id,
            number_files: 0,
          }),
        }
      );

      console.log("hit the endpoint");

      setLoading(false);

      let data = await response.json();

      console.log(data);

      if (response.status !== 201) {
        setError("There was an error creating the case. Please try again.");
        return;
      }
      localStorage.removeItem("cases");

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error creating case", error);
      setError("There was an error creating the case. Please try again.");
      setLoading(false);
    }
  }

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    switch (name) {
      case "caseTitle":
        setCaseTitle(value);
        break;
      case "caseInformation":
        setCaseInformation(value);
        break;
      case "attorneyFirstName":
        setAttorneyFirstName(value);
        break;
      case "attorneyLastName":
        setAttorneyLastName(value);
        break;
      case "judge":
        setJudge(value);
        break;
      case "state":
        setState(value);
        break;
      case "city":
        setCity(value);
        break;
      case "type":
        setType(value);
        break;
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Basic Case Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This will give Rachel a better understanding of your case to
              answer your questions.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="caseTitle"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Case Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black sm:max-w-md">
                    <input
                      onChange={(e) => handleInputChange(e)}
                      type="text"
                      name="caseTitle"
                      id="caseTitle"
                      autoComplete="caseTitle"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:px-2 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Citizens United v. The Federal Election Commission"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="caseInformation"
                  className="block text-sm font-medium leading-6 text-gray-900 whitespace-normal"
                >
                  Case Information
                </label>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Provide a description and list the facts that are important to
                  the case.
                </p>
                <div className="mt-2">
                  <textarea
                    onChange={(e) => handleInputChange(e)}
                    id="caseInformation"
                    name="caseInformation"
                    cols={30}
                    className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Advanced Case Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Add any additional information that is needed for the case
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="attorneyFirstName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Attorney First name
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => handleInputChange(e)}
                    type="text"
                    name="attorneyFirstName"
                    id="attorneyFirstName"
                    className="px-3  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="attorneyLastName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Attorney Last name
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => handleInputChange(e)}
                    type="text"
                    name="attorneyLastName"
                    id="attorneyLastName"
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="judge"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Judge Name
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => handleInputChange(e)}
                    id="judge"
                    name="judge"
                    type="judge"
                    className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State
                </label>
                <div className="mt-2">
                  <select
                    id="state"
                    name="state"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={(e) => handleInputChange(e)}
                  >
                    {" "}
                    <option value="">State of Jurisdiction</option>
                    <option value="Alabama">Alabama</option>
                    <option value="Alaska">Alaska</option>
                    <option value="Arizona">Arizona</option>
                    <option value="Arkansas">Arkansas</option>
                    <option value="California">California</option>
                    <option value="Colorado">Colorado</option>
                    <option value="Connecticut">Connecticut</option>
                    <option value="Delaware">Delaware</option>
                    <option value="Florida">Florida</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Hawaii">Hawaii</option>
                    <option value="Idaho">Idaho</option>
                    <option value="Illinois">Illinois</option>
                    <option value="Indiana">Indiana</option>
                    <option value="Iowa">Iowa</option>
                    <option value="Kansas">Kansas</option>
                    <option value="Kentucky">Kentucky</option>
                    <option value="Louisiana">Louisiana</option>
                    <option value="Maine">Maine</option>
                    <option value="Maryland">Maryland</option>
                    <option value="Massachusetts">Massachusetts</option>
                    <option value="Michigan">Michigan</option>
                    <option value="Minnesota">Minnesota</option>
                    <option value="Mississippi">Mississippi</option>
                    <option value="Missouri">Missouri</option>
                    <option value="Montana">Montana</option>
                    <option value="Nebraska">Nebraska</option>
                    <option value="Nevada">Nevada</option>
                    <option value="New Hampshire">New Hampshire</option>
                    <option value="New Jersey">New Jersey</option>
                    <option value="New Mexico">New Mexico</option>
                    <option value="New York">New York</option>
                    <option value="North Carolina">North Carolina</option>
                    <option value="North Dakota">North Dakota</option>
                    <option value="Ohio">Ohio</option>
                    <option value="Oklahoma">Oklahoma</option>
                    <option value="Oregon">Oregon</option>
                    <option value="Pennsylvania">Pennsylvania</option>
                    <option value="Rhode Island">Rhode Island</option>
                    <option value="South Carolina">South Carolina</option>
                    <option value="South Dakota">South Dakota</option>
                    <option value="Tennessee">Tennessee</option>
                    <option value="Texas">Texas</option>
                    <option value="Utah">Utah</option>
                    <option value="Vermont">Vermont</option>
                    <option value="Virginia">Virginia</option>
                    <option value="Washington">Washington</option>
                    <option value="West Virginia">West Virginia</option>
                    <option value="Wisconsin">Wisconsin</option>
                    <option value="Wyoming">Wyoming</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => handleInputChange(e)}
                    type="text"
                    name="city"
                    id="city"
                    className="px-3  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Type
                </label>
                <div className="mt-2">
                  <select
                    id="type"
                    name="type"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={(e) => handleInputChange(e)}
                  >
                    {" "}
                    <option value="">Select Type</option>
                    <option value="Civil">Civil</option>
                    <option value="Criminal">Criminal</option>
                    <option value="Family">Family</option>
                    <option value="Probate">Probate</option>
                    <option value="Tax">Tax</option>
                    <option value="Traffic">Traffic</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6 pb-10">
          {error && (
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex rounded-md bg-black px-5 py-2 text-md font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            {loading && (
              <div role="status" className="mr-3">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}

            <div> Save</div>
          </button>
        </div>
      </form>
    </div>
  );
}
