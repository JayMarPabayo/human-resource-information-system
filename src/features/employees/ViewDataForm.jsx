import { useState } from "react";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { MdFamilyRestroom, MdWorkHistory } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { RiGovernmentFill } from "react-icons/ri";
import { useForm } from "react-hook-form";

import PropTypes from "prop-types";

import TextInput from "../../utils/TextInput";

const ViewDataForm = ({ onClose, employeeData = {} }) => {
  const { ...values } = employeeData;
  const { register } = useForm({
    defaultValues: values,
  });

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const tabData = [
    {
      label: "Personal Information",
      icon: <BsFillPersonVcardFill className="text-sm" />,
      content: <PersonalInformationTab />,
    },
    {
      label: "Family Background",
      icon: <MdFamilyRestroom className="text-sm" />,
      content: <FamilyBackgroundTab />,
    },
    {
      label: "Educational Background",
      icon: <FaGraduationCap className="text-sm" />,
      content: <EducationalBackgroundTab />,
    },
    {
      label: "Civil Service Eligibility",
      icon: <RiGovernmentFill className="text-sm" />,
      content: <CivilServiceTab />,
    },
    {
      label: "Work Experience",
      icon: <MdWorkHistory className="text-sm" />,
      content: <WorkExperienceTab />,
    },
  ];

  // -- API Calls

  return (
    <>
      <form>
        <section className="flex items-center justify-between">
          <h6 className="text-xl font-semibold text-slate-800">
            View Employee
          </h6>
          <div className="flex gap-x-2 items-center">
            <h6 className="text-base font-medium text-slate-500">
              Department / Designation
            </h6>
            <TextInput
              textSize="text-xs"
              width="w-36"
              placeholder="Department"
              {...register("employeeDepartment")}
              readOnly
            />
            <TextInput
              textSize="text-xs"
              width="w-52"
              placeholder="Designation"
              {...register("employeeDesignation")}
              readOnly
            />
          </div>
        </section>
        <div className="flex font-medium tab-buttons text-xs rounded-md tracking-wide bg-gray-300 mt-3">
          {tabData.map((tab, index) => (
            <button
              type="button"
              key={index}
              className={`flex items-center gap-x-1 transition-all duraion-300 px-3 py-2 hover:bg-slate-100 ${
                activeTab === index ? "bg-white shadow-md scale-105 z-20" : ""
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
        <div className="tab-content">{tabData[activeTab].content}</div>
        <footer className="flex w-full justify-end h-12 gap-x-4 pt-2 pe-5 border-t border-t-gray-400 border-opacity-40">
          <button
            type="button"
            title="Close"
            className="text-sm font-semibold w-40 text-slate-700 border border-opacity-10 border-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 hover:text-slate-900 hover:scale-110 transition-all duration-300"
            onClick={() => onClose()}
          >
            <span>Close</span>
          </button>
        </footer>
      </form>
    </>
  );

  function PersonalInformationTab() {
    return (
      <section className="mt-3 h-[30rem] overflow-y-scroll overflow-x-hidden">
        <h3 className="text-xl font-light tracking-wider text-gray-500 col-">
          Personal Information
        </h3>
        <div className="mt-3 px-2 w-full grid grid-cols-10 gap-x-2">
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-3"
            label="First Name"
            placeholder="First Name"
            {...register("employeeFirstName")}
            readOnly
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-3"
            label="Middle Name"
            placeholder="Middle Name"
            {...register("employeeMiddleName")}
            readOnly
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-3"
            label="Last Name"
            placeholder="Last Name"
            {...register("employeeLastName")}
            readOnly
          />
          <TextInput
            textSize="text-xs"
            width="col-span-1"
            label="Name Extension"
            placeholder="Name Extension"
            {...register("employeeNameExtension")}
            readOnly
          />
        </div>
        <div className="mt-3 px-2 w-full grid grid-cols-12 gap-x-2">
          <TextInput
            type="date"
            textSize="text-xs"
            width="col-span-2"
            label="Birthdate"
            placeholder="Birthdate"
            {...register("employeeBirthdate")}
            readOnly
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-4"
            label="Place of Birth"
            placeholder="Place of Birth"
            {...register("employeeBirthplace")}
            readOnly
          />
          <TextInput
            textSize="text-xs"
            width="col-span-2"
            label="Gender"
            placeholder="Gender"
            {...register("employeeGender")}
            readOnly
          />
          <TextInput
            textSize="text-xs"
            width="col-span-2"
            label="Civil Status"
            placeholder="Civil Status"
            {...register("employeeCivilStatus")}
            readOnly
          />
          <TextInput
            textSize="text-xs"
            width="col-span-2"
            label="Citizenship"
            placeholder="Citizenship"
            {...register("employeeCitizenship")}
            readOnly
          />
        </div>
        <div className="mt-3 px-2 w-full grid grid-cols-9 gap-x-2">
          <TextInput
            type="number"
            textSize="text-xs"
            width="col-span-1"
            label="Height (m)"
            placeholder="Height (m)"
            step=".01"
            {...register("employeeHeight")}
            readOnly
          />
          <TextInput
            type="number"
            textSize="text-xs"
            width="col-span-1"
            label="Weight (kg)"
            placeholder="Weight (kg)"
            step=".01"
            {...register("employeeWeight")}
            readOnly
          />
          <TextInput
            textSize="text-xs"
            width="col-span-1"
            label="Blood Type"
            placeholder="Blood Type"
            {...register("employeeBloodType")}
            readOnly
          />
          <TextInput
            type="tel"
            textSize="text-xs"
            width="col-span-2"
            label="Telephone"
            placeholder="Telephone Number"
            {...register("employeeTelephone")}
            readOnly
          />
          <TextInput
            type="tel"
            textSize="text-xs"
            width="col-span-2"
            label="Mobile No."
            placeholder="Mobile Number"
            {...register("employeeMobile")}
            readOnly
          />
          <TextInput
            type="email"
            textSize="text-xs"
            width="col-span-2"
            label="Email"
            placeholder="Email Address"
            {...register("employeeEmail")}
            readOnly
          />
        </div>
        <div className="mt-3 w-full p-2 pb-4 rounded-lg grid grid-cols-3 gap-y-3 gap-x-2 bg-slate-200">
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-1"
            label="GSIS ID"
            placeholder="No."
            {...register("employeeGSIS")}
            readOnly
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-1"
            label="Pag-ibig ID"
            placeholder="No."
            {...register("employeePagIbig")}
            readOnly
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-1"
            label="PhilHealth"
            placeholder="No."
            {...register("employeePhilHealth")}
            readOnly
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-1"
            label="SSS"
            placeholder="No."
            {...register("employeeSSS")}
            readOnly
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-1"
            label="TIN"
            placeholder="No."
            {...register("employeeTIN")}
            readOnly
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-1"
            label="Agency Employee"
            placeholder="No."
            {...register("employeeAgencyNumber")}
            readOnly
          />
        </div>
        <div className="grid grid-cols-2 px-2 gap-x-10 mt-3">
          <div className="col-span-1">
            <h3 className="text-xl mb-3 font-light tracking-wider text-gray-500 col-">
              Residential Address
            </h3>
            <section className="grid grid-cols-2 gap-x-2 pb-5">
              <div className="col-span-1 flex flex-col gap-y-3">
                <TextInput
                  textSize="text-xs"
                  label="Region"
                  placeholder="Address"
                  {...register("residentialRegion")}
                  readOnly
                />
                <TextInput
                  textSize="text-xs"
                  label="Province"
                  placeholder="Address"
                  {...register("residentialProvince")}
                  readOnly
                />
                <TextInput
                  textSize="text-xs"
                  label="City/Municipality"
                  placeholder="Address"
                  {...register("residentialCity")}
                  readOnly
                />
                <TextInput
                  textSize="text-xs"
                  label="Barangay"
                  placeholder="Address"
                  {...register("residentialBarangay")}
                  readOnly
                />
              </div>
              <div className="col-span-1 flex flex-col gap-y-3">
                <TextInput
                  type="number"
                  textSize="text-xs"
                  label="ZIP Code"
                  placeholder="ZIP Code"
                  {...register("residentialZIPcode")}
                  readOnly
                />
                <TextInput
                  type="text"
                  textSize="text-xs"
                  label="Subdivision/Village"
                  placeholder="Subdivision/Village"
                  {...register("residentialSubdivision")}
                  readOnly
                />
                <TextInput
                  type="text"
                  textSize="text-xs"
                  label="Street"
                  placeholder="Street"
                  {...register("residentialStreet")}
                  readOnly
                />
                <TextInput
                  type="text"
                  textSize="text-xs"
                  label="House/Block/Lot No."
                  placeholder="House/Block/Lot No."
                  {...register("residentialHouseBlock")}
                  readOnly
                />
              </div>
            </section>
          </div>
          <div className="col-span-1">
            <h3 className="text-xl mb-3 font-light tracking-wider text-gray-500 col-">
              Permanent Address
            </h3>
            <section className="grid grid-cols-2 gap-x-2 pb-5">
              <div className="col-span-1 flex flex-col gap-y-3">
                <TextInput
                  textSize="text-xs"
                  label="Region"
                  placeholder="Address"
                  {...register("permanentRegion")}
                  readOnly
                />
                <TextInput
                  textSize="text-xs"
                  label="Province"
                  placeholder="Address"
                  {...register("permanentProvince")}
                  readOnly
                />
                <TextInput
                  textSize="text-xs"
                  label="City/Municipality"
                  placeholder="Address"
                  {...register("permanentCity")}
                  readOnly
                />
                <TextInput
                  textSize="text-xs"
                  label="Barangay"
                  placeholder="Address"
                  {...register("permanentBarangay")}
                  readOnly
                />
              </div>
              <div className="col-span-1 flex flex-col gap-y-3">
                <TextInput
                  type="number"
                  textSize="text-xs"
                  label="ZIP Code"
                  placeholder="ZIP Code"
                  {...register("permanentZIPcode")}
                  readOnly
                />
                <TextInput
                  type="text"
                  textSize="text-xs"
                  label="Subdivision/Village"
                  placeholder="Subdivision/Village"
                  {...register("permanentSubdivision")}
                  readOnly
                />
                <TextInput
                  type="text"
                  textSize="text-xs"
                  label="Street"
                  placeholder="Street"
                  {...register("permanentStreet")}
                  readOnly
                />
                <TextInput
                  type="text"
                  textSize="text-xs"
                  label="House/Block/Lot No."
                  placeholder="House/Block/Lot No."
                  {...register("permanentHouseBlock")}
                  readOnly
                />
              </div>
            </section>
          </div>
        </div>
      </section>
    );
  }

  function FamilyBackgroundTab() {
    return (
      <section className="mt-3 h-[30rem] overflow-y-scroll overflow-x-hidden">
        <h3 className="text-xl font-light tracking-wider text-gray-500">
          Family Background
        </h3>
      </section>
    );
  }

  function EducationalBackgroundTab() {
    return (
      <section className="mt-3 h-[30rem] overflow-y-scroll overflow-x-hidden">
        <h3 className="text-xl font-light tracking-wider text-gray-500">
          Educational Background
        </h3>
      </section>
    );
  }

  function CivilServiceTab() {
    return (
      <section className="mt-3 h-[30rem] overflow-y-scroll overflow-x-hidden">
        <h3 className="text-xl font-light tracking-wider text-gray-500">
          Civil Service Eligibility
        </h3>
      </section>
    );
  }

  function WorkExperienceTab() {
    return (
      <section className="mt-3 h-[30rem] overflow-y-scroll overflow-x-hidden">
        <h3 className="text-xl font-light tracking-wider text-gray-500">
          Work Experience
        </h3>
      </section>
    );
  }
};
ViewDataForm.propTypes = {
  onClose: PropTypes.func,
  employeeData: PropTypes.object,
};

export default ViewDataForm;
