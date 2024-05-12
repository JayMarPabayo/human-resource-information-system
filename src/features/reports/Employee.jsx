import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import PropTypes from "prop-types";

const Employee = ({ setShowEmployeePrint, employee }) => {
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: `${employee.employeeLastName}, ${
      employee.employeeFirstName
    }  ${employee.employeeMiddleName.charAt(0).toUpperCase()}. (PDS)`,
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  return (
    <>
      <div className="rounded-none h-[160mm] w-[240mm] border-2 overflow-y-scroll pe-1">
        <div
          ref={contentToPrint}
          className="min-h-[356mm] min-w-[216mm] px-4 py-6 flex flex-col gap-3 text-sm"
        >
          <section className="grid grid-cols-5 h-fit w-fit ps-2 gap-x-2">
            <img
              src="/logo.png"
              alt="Logo"
              className="col-span-1 row-span-2 w-12 h-12 drop-shadow-md"
            />
            <h2 className="col-span-4 font-extrabold text-lg">
              PERSONAL DATA SHEET
            </h2>
            <h2 className="col-span-4 text-slate-400 font-medium text-xs">
              Human Resource Information System
            </h2>
          </section>
          <section className="relative border-t-2 border-cyan-700 border-opacity-15 mt-10">
            <h5 className="text-center text-base text-cyan-700 font-bold h-6 absolute left-0 -top-4 bg-white px-2">
              Personal Information
            </h5>
          </section>
          <div className="grid grid-cols-11 gap-x-1 gap-y-1 px-2 mt-3 items-center text-xs">
            {/* 1st Row */}
            <div className="col-span-2 text-slate-500 tracking-wider text-xs">
              Name
            </div>
            <div className="col-span-4 text-slate-800 font-semibold">
              {`${employee.employeeFirstName} ${employee.employeeMiddleName} ${
                employee.employeeLastName
              } ${employee.employeeNameExtension || ""}`}
            </div>
            <div className="col-span-2 text-slate-500 tracking-wider text-xs">
              Telephone No.
            </div>
            <div className="col-span-3 text-slate-800 font-semibold">
              {employee.employeeTelephone || "N/A"}
            </div>
            {/* 2nd Row */}
            <div className="col-span-2 text-slate-500 tracking-wider text-xs">
              Gender
            </div>
            <div className="col-span-4 text-slate-800 font-semibold">
              {employee.employeeGender || "N/A"}
            </div>
            <div className="col-span-2 text-slate-500 tracking-wider text-xs">
              Mobile No.
            </div>
            <div className="col-span-3 text-slate-800 font-semibold">
              {employee.employeeMobile || "N/A"}
            </div>
            {/* 3rd Row */}
            <div className="col-span-2 text-slate-500 tracking-wider text-xs">
              Birthdate
            </div>
            <div className="col-span-4 text-slate-800 font-semibold">
              {employee.employeeBirthdate || "N/A"}
            </div>
            <div className="col-span-2 text-slate-500 tracking-wider text-xs">
              Email
            </div>
            <div className="col-span-3 text-slate-800 font-semibold">
              {employee.employeeEmail || "N/A"}
            </div>
            {/* 4th Row */}
            <div className="col-span-2 text-slate-500 tracking-wider text-xs">
              Place of Birth
            </div>
            <div className="col-span-4 text-slate-800 font-semibold">
              {employee.employeeBirthplace || "N/A"}
            </div>
            <div className="col-span-2 text-slate-500 tracking-wider text-xs">
              GSIS No.
            </div>
            <div className="col-span-3 text-slate-800 font-semibold">
              {employee.employeeGSIS || "N/A"}
            </div>
            {/* 5th Row */}
            <div className="col-span-2 text-slate-500 tracking-wider text-xs">
              Civil Status
            </div>
            <div className="col-span-4 text-slate-800 font-semibold">
              {employee.employeeCivilStatus || "N/A"}
            </div>
            <div className="col-span-2 text-slate-500 tracking-wider text-xs">
              Pag-ibig No.
            </div>
            <div className="col-span-3 text-slate-800 font-semibold">
              {employee.employeePagIbig || "N/A"}
            </div>
            {/* 6th Row */}
            <div className="col-span-2 text-slate-500 tracking-wider text-xs">
              Citizenship
            </div>
            <div className="col-span-4 text-slate-800 font-semibold">
              {employee.employeeCitizenship || "N/A"}
            </div>
            <div className="col-span-2 text-slate-500 tracking-wider text-xs">
              PhilHealth No.
            </div>
            <div className="col-span-3 text-slate-800 font-semibold">
              {employee.employeePhilHealth || "N/A"}
            </div>
            {/* 7th Row */}
            <div className="col-span-2 text-slate-500 tracking-wider text-xs">
              Blood Type
            </div>
            <div className="col-span-4 text-slate-800 font-semibold">
              {employee.employeeBloodType || "N/A"}
            </div>
            <div className="col-span-2 text-slate-500 tracking-wider text-xs">
              SSS No.
            </div>
            <div className="col-span-3 text-slate-800 font-semibold">
              {employee.employeeSSS || "N/A"}
            </div>
            {/* 8th Row */}
            <div className="col-span-2 text-slate-500 tracking-wider text-xs">
              Height
            </div>
            <div className="col-span-4 text-slate-800 font-semibold">
              {employee.employeeHeight ? `${employee.employeeHeight} m` : "N/A"}
            </div>
            <div className="col-span-2 text-slate-500 tracking-wider text-xs">
              TIN No.
            </div>
            <div className="col-span-3 text-slate-800 font-semibold">
              {employee.employeeTIN || "N/A"}
            </div>
            {/* 9th Row */}
            <div className="col-span-2 text-slate-500 tracking-wider text-xs">
              Weight
            </div>
            <div className="col-span-4 text-slate-800 font-semibold">
              {employee.employeeWeight
                ? `${employee.employeeWeight} kg`
                : "N/A"}
            </div>
            <div className="col-span-2 text-slate-500 tracking-wider text-xs">
              Agency Employee No.
            </div>
            <div className="col-span-3 text-slate-800 font-semibold">
              {employee.employeeAgencyEmployee || "N/A"}
            </div>
          </div>

          <section className="relative border-t-2 border-cyan-700 border-opacity-15 mt-4">
            <h5 className="text-center text-base text-cyan-700 font-bold h-6 absolute left-0 -top-4 bg-white px-2">
              Family Background
            </h5>
          </section>
          <div className="grid grid-cols-11 gap-x-1 gap-y-1 px-2 mt-3 items-start text-xs">
            <div className="col-span-2 text-slate-500 tracking-wider text-xs">
              Father
            </div>
            <div className="col-span-4 text-slate-800 font-semibold">
              {`${employee.fatherFirstName} ${employee.fatherMiddleName} ${
                employee.fatherLastName
              } ${employee.fatherNameExtension || ""}`}
            </div>
            <div className="col-span-2 text-slate-500 tracking-wider text-xs">
              {employee.spouseFirstName ? "Spouse" : "Mother"}
            </div>
            <div className="col-span-3 text-slate-800 font-semibold">
              {employee.spouseFirstName
                ? `${employee.spouseFirstName} ${employee.spouseMiddleName} ${
                    employee.spouseLastName
                  } ${employee.spouseNameExtension || ""}`
                : `${employee.motherFirstName} ${employee.motherMiddleName} ${
                    employee.motherLastName
                  } ${employee.motherNameExtension || ""}`}
            </div>
            {employee.spouseFirstName && (
              <>
                <div className="col-span-2 text-slate-500 tracking-wider text-xs">
                  Mother
                </div>
                <div className="col-span-4 text-slate-800 font-semibold">{`${
                  employee.motherFirstName
                } ${employee.motherMiddleName} ${employee.motherLastName} ${
                  employee.motherNameExtension || ""
                }`}</div>
              </>
            )}
            {employee.spouseOccupation && (
              <>
                <div className="col-span-2 text-slate-500 tracking-wider text-xs">
                  Occupation
                </div>
                <div className="col-span-3 text-slate-800 font-semibold">
                  {employee.spouseOccupation}
                </div>
              </>
            )}
            <div className="col-span-2 text-slate-500 tracking-wider text-xs">
              {employee.children.length > 0 ? "Children" : ""}
            </div>
            <div className="col-span-4 row-span-2 text-slate-800 font-semibold">
              {employee.children?.map((child, index) => {
                return (
                  <p key={index}>
                    {child.childrenFullName || ""}{" "}
                    <span className="font-medium text-xs text-slate-500">
                      ({child.childrenGender})
                    </span>
                  </p>
                );
              })}
            </div>
            {employee.spouseEmployerBusiness && (
              <>
                <div className="col-span-2 text-slate-500 tracking-wider text-xs">
                  Employer/Business
                </div>
                <div className="col-span-3 text-slate-800 font-semibold">
                  {employee.spouseEmployerBusiness}
                </div>
              </>
            )}
            {employee.spouseBusinessAddress && (
              <>
                <div className="col-start-7 col-span-2 text-slate-500 tracking-wider text-xs">
                  Business Address
                </div>
                <div className="col-span-3 text-slate-800 font-semibold">
                  {employee.spouseBusinessAddress}
                </div>
              </>
            )}
            {employee.spouseTelephone && (
              <>
                <div className="col-start-7 col-span-2 text-slate-500 tracking-wider text-xs">
                  Telephone
                </div>
                <div className="col-span-3 text-slate-800 font-semibold">
                  {employee.spouseTelephone}
                </div>
              </>
            )}
          </div>

          {employee.educations?.length > 0 && (
            <>
              <section className="relative border-t-2 border-cyan-700 border-opacity-15 mt-3">
                <h5 className="text-center text-base text-cyan-700 font-bold h-6 absolute left-0 -top-4 bg-white px-2">
                  Educational Background
                </h5>
              </section>
              <table className="table-auto w-full text-sm text-left text-gray-600">
                <thead
                  className="text-gray-700 uppercase bg-slate-200"
                  style={{
                    fontSize: "0.65rem",
                  }}
                >
                  <tr>
                    <th scope="col" className="py-2 ps-2">
                      Level
                    </th>
                    <th scope="col" className="py-2 px-1">
                      School
                    </th>
                    <th scope="col" className="py-2 px-1">
                      Degree/Course
                    </th>
                    <th scope="col" className="py-2 px-1 text-center">
                      Attendance
                    </th>
                    <th scope="col" className="py-2 px-1">
                      Level/Units
                    </th>
                    <th scope="col-2" className="py-2 px-1 text-center">
                      <p>Graduated</p>
                    </th>
                    <th scope="col" className="py-2 px-1">
                      Awards/Honors
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white text-xs ">
                  {employee.educations?.map((row, index) => (
                    <tr key={index} className="align-top">
                      <td className="py-2 px-1 ps-2">{row.educationLevel}</td>
                      <td className="py-2 px-1">{row.educationSchoolName}</td>
                      <td className="py-2 px-1">{row.educationDegreeCourse}</td>
                      <td className="py-2 px-1 text-center">{`${
                        row.educationAttendFrom || ""
                      } - ${row.educationAttendTo || ""}`}</td>
                      <td className="py-2 px-1">
                        {row.educationLevelEarned || ""}
                      </td>
                      <td className="py-2 px-1 text-center">
                        {row.educationYearGraduated}
                      </td>
                      <td className="py-2 px-1">
                        {row.educationHonorsReceived}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {employee.eligibilities?.length > 0 && (
            <>
              <section className="relative border-t-2 border-cyan-700 border-opacity-15 mt-8">
                <h5 className="text-center text-base text-cyan-700 font-bold h-6 absolute left-0 -top-4 bg-white px-2">
                  Government Employment Eligibilities
                </h5>
              </section>
              <table className="table-auto w-full text-sm text-left text-gray-600">
                <thead
                  className="text-gray-700 uppercase bg-slate-200"
                  style={{
                    fontSize: "0.65rem",
                  }}
                >
                  <tr>
                    <th scope="col" className="py-2 ps-2">
                      Examination
                    </th>
                    <th scope="col" className="py-2 px-1">
                      Rating
                    </th>
                    <th scope="col" className="py-2 px-1">
                      Examination Date
                    </th>
                    <th scope="col" className="py-2 px-1">
                      Place of Examination
                    </th>
                    <th
                      scope="col"
                      colSpan={2}
                      className="py-2 px-1 text-center"
                    >
                      <p>License</p>
                      <p
                        style={{
                          fontSize: "0.7rem",
                        }}
                      >
                        Number / Validity
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white text-xs ">
                  {employee.eligibilities?.map((row, index) => (
                    <tr key={index} className="align-top">
                      <td className="py-2 px-1 ps-2">
                        {row.eligibilityExamName}
                      </td>
                      <td className="py-2 px-1">
                        {row.eligibilityExamRating
                          ? `${Number(row.eligibilityExamRating).toFixed(2)} %`
                          : ""}
                      </td>
                      <td className="py-2 px-1">{row.eligibilityExamDate}</td>
                      <td className="py-2 px-1">{row.eligibilityExamPlace}</td>
                      <td className="py-2 px-1 text-center">
                        {row.eligibilityLicenseNumber}
                      </td>
                      <td className="py-2 px-1 text-center">
                        {row.eligibilityLicenseValidity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {employee.workExperiences?.length > 0 && (
            <>
              <section className="relative border-t-2 border-cyan-700 border-opacity-15 mt-8">
                <h5 className="text-center text-base text-cyan-700 font-bold h-6 absolute left-0 -top-4 bg-white px-2">
                  Work Experience
                </h5>
              </section>
              <table className="table-auto w-full text-sm text-left text-gray-600">
                <thead
                  className="text-gray-700 uppercase bg-slate-200"
                  style={{
                    fontSize: "0.65rem",
                  }}
                >
                  <tr>
                    <th
                      scope="col"
                      colSpan={2}
                      className="py-2 ps-2 text-center"
                    >
                      Inclusive Dates
                      <p
                        style={{
                          fontSize: "0.7rem",
                        }}
                      >
                        From / To
                      </p>
                    </th>
                    <th scope="col" className="py-2 px-1">
                      Position
                    </th>
                    <th scope="col" className="py-2 px-1">
                      <p>Department/Agency</p>
                      <p>Office/Company</p>
                    </th>
                    <th scope="col" className="py-2 px-1">
                      Monthly Salary
                    </th>
                    <th scope="col" className="py-2 px-1 text-center">
                      Job/Pay Grade
                    </th>
                    <th scope="col" className="py-2 px-1 text-center">
                      Status
                    </th>
                    <th scope="col" className="py-2 px-1 text-center">
                      Government Service
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white text-xs ">
                  {employee.workExperiences?.map((row, index) => (
                    <tr key={index} className="align-top">
                      <td className="py-2 px-1 ps-2">{row.workFrom}</td>
                      <td className="py-2 px-1">{row.workTo}</td>
                      <td className="py-2 px-1">{row.workPosition}</td>
                      <td className="py-2 px-1">{row.workCompany}</td>
                      <td className="py-2 px-1">
                        {formatToPesoString(row.workMonthlySalary)}
                      </td>
                      <td className="py-2 px-1 text-center">
                        {row.workPayGrade}
                      </td>
                      <td className="py-2 px-1">{row.workAppointmentStatus}</td>
                      <td className="py-2 px-1 text-center">
                        {row.workGovtService}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
      <section className="flex gap-x-4 items-center justify-end px-3 mt-5">
        <button
          type="button"
          title="Cancel"
          className="text-sm font-semibold w-40 text-slate-700 border border-opacity-10 border-slate-600 bg-slate-100 p-2 rounded-md hover:bg-slate-200 hover:text-slate-900 hover:scale-110 transition-all duration-300"
          onClick={() => setShowEmployeePrint(false)}
        >
          <span>Cancel</span>
        </button>
        <button
          type="button"
          title="Delete"
          className="text-sm font-semibold w-40 text-white bg-slate-700 p-2 rounded-md hover:bg-slate-600 hover:scale-110 transition-all duration-300"
          onClick={() => {
            handlePrint(null, () => contentToPrint.current);
          }}
        >
          <span>Print</span>
        </button>
      </section>
    </>
  );
};

function formatToPesoString(numberStr) {
  let number;
  try {
    number = parseInt(numberStr, 10);
  } catch (error) {
    return "Invalid number";
  }

  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });

  return formatter.format(number);
}

Employee.propTypes = {
  setShowEmployeePrint: PropTypes.func,
  employee: PropTypes.object,
};

export default Employee;
