import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { BsFillPersonVcardFill } from "react-icons/bs";
import { FaCirclePlus, FaTrash } from "react-icons/fa6";
import { MdFamilyRestroom, MdWorkHistory } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { RiGovernmentFill } from "react-icons/ri";
import { BiSolidGroup } from "react-icons/bi";

import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "../../services/apiDepartments";
import { useCreateEmployee } from "./useCreateEmployee";
import { useUpdateEmployee } from "./useUpdateEmployee";

import PropTypes from "prop-types";

import TextInput from "../../utils/TextInput";
import SelectInput from "../../utils/SelectInput";
import BigSpinner from "../../utils/BigSpinner";
import citizenships from "../../utils/citizenships";

const CreateForm = ({ onClose, employeeData = {} }) => {
  const { employeeCreating, createEmployee } = useCreateEmployee();
  const { updateEmployee, employeeUpdating } = useUpdateEmployee();
  const [childrenList, setChildrenList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [eligibilityList, setEligibilityList] = useState([]);
  const [workExperienceList, setWorkExperienceList] = useState([]);

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
  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });

  const { id: editID, ...editValues } = employeeData;
  const isEditSession = Boolean(editID);

  // -- Load children containers if exists (editSession)
  useEffect(() => {
    if (isEditSession) {
      const newChildrenList = editValues.children?.map((e, index) => ({
        key: `child-${index}`,
        ...e,
      }));
      setChildrenList(newChildrenList);
    }
  }, [isEditSession, editValues.children]);

  // -- Load educations containers if exists (editSession)
  useEffect(() => {
    if (isEditSession) {
      const newEducationsList = editValues.educations?.map((e, index) => ({
        key: `education-${index}`,
        ...e,
      }));
      setEducationList(newEducationsList);
    }
  }, [isEditSession, editValues.educations]);

  // -- Load eligibilities containers if exists (editSession)
  useEffect(() => {
    if (isEditSession) {
      const newEligibilityList = editValues.eligibilities?.map((e, index) => ({
        key: `eligibility-${index}`,
        ...e,
      }));
      setEligibilityList(newEligibilityList);
    }
  }, [isEditSession, editValues.eligibilities]);

  // -- Load workExperiences containers if exists (editSession)
  useEffect(() => {
    if (isEditSession) {
      const newWorkExperience = editValues.workExperiences?.map((e, index) => ({
        key: `work-${index}`,
        ...e,
      }));
      setWorkExperienceList(newWorkExperience);
    }
  }, [isEditSession, editValues.workExperiences]);

  // -- form Hook
  const { register, unregister, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  function onError(errors) {
    console.error(errors);
  }

  let isLoading = employeeCreating || employeeUpdating;

  function onSubmit(data) {
    delete data.created_at;
    delete data.departments;
    if (isEditSession) {
      updateEmployee(
        {
          employee: data,
          id: editID,
        },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        }
      );
    } else {
      createEmployee(data, {
        onSuccess: () => {
          reset();
          onClose();
        },
      });
    }
  }

  // -- children function
  const addChild = () => {
    setChildrenList((prevList) => [
      ...(prevList || []),
      { key: `child-${prevList?.length}` },
    ]);
  };

  const removeChild = (key) => {
    setChildrenList((prevList) =>
      prevList.filter((child) => child.key !== key)
    );
  };

  // -- education function
  const addEducation = () => {
    setEducationList((prevList) => [
      ...(prevList || []),
      { key: `education-${prevList?.length}` },
    ]);
  };

  const removeEducation = (key) => {
    setEducationList((prevList) =>
      prevList.filter((education) => education.key !== key)
    );
  };

  // -- eligibility function
  const addEligibility = () => {
    setEligibilityList((prevList) => [
      ...(prevList || []),
      { key: `eligibility-${prevList?.length}` },
    ]);
  };

  const removeEligibility = (key) => {
    setEligibilityList((prevList) =>
      prevList.filter((eligibility) => eligibility.key !== key)
    );
  };

  // -- work experience function
  const addWorkExperience = () => {
    setWorkExperienceList((prevList) => [
      ...(prevList || []),
      { key: `work-${prevList?.length}` },
    ]);
  };

  const removeWorkExperience = (key) => {
    setWorkExperienceList((prevList) =>
      prevList.filter((work) => work.key !== key)
    );
  };

  return (
    <>
      {isLoading && <BigSpinner />}

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <section className="flex items-center justify-between">
          <h6 className="text-xl font-semibold text-slate-800">
            {isEditSession ? "Update" : "New"} Employee
          </h6>
          <div className="flex gap-x-2 items-center">
            <BiSolidGroup className="text-lg text-slate-700" />
            <h6 className="text-base font-medium text-slate-500">
              Department / Designation
            </h6>
            <SelectInput
              textSize="text-xs"
              width="w-40"
              {...register("employeeDepartment")}
              options={departments?.map((item) => ({
                label: item.departmentName,
                value: `${item.id}`,
              }))}
            />
            <TextInput
              textSize="text-xs"
              width="w-52"
              placeholder="Designation"
              errorState={errors?.employeeDesignation?.message}
              {...register("employeeDesignation", {
                required: "This field is required",
              })}
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
            title="Cancel"
            className="text-sm font-semibold w-40 text-slate-700 border border-opacity-10 border-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 hover:text-slate-900 hover:scale-110 transition-all duration-300"
            disabled={isLoading}
            onClick={() => onClose()}
          >
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            title="Submit"
            className="text-sm font-semibold w-40 text-white bg-slate-700 rounded-md hover:bg-slate-600 hover:scale-110 transition-all duration-300"
            disabled={isLoading}
          >
            <span>{isEditSession ? "Update" : "Submit"}</span>
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
            errorState={errors?.employeeFirstName?.message}
            placeholder="First Name"
            {...register("employeeFirstName", {
              required: "This field is required",
            })}
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-3"
            label="Middle Name"
            errorState={errors?.employeeMiddleName?.message}
            placeholder="Middle Name"
            {...register("employeeMiddleName", {
              required: "This field is required",
            })}
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-3"
            label="Last Name"
            errorState={errors?.employeeLastName?.message}
            placeholder="Last Name"
            {...register("employeeLastName", {
              required: "This field is required",
            })}
          />
          <SelectInput
            textSize="text-xs"
            width="col-span-1"
            label="Name Extension"
            {...register("employeeNameExtension")}
            options={[
              { label: "", value: "" },
              { label: "Jr.", value: "Jr." },
              { label: "Sr.", value: "Sr." },
              { label: "II", value: "II" },
              { label: "III", value: "III" },
              { label: "IV", value: "IV" },
              { label: "V", value: "V" },
            ]}
          />
        </div>
        <div className="mt-3 px-2 w-full grid grid-cols-12 gap-x-2">
          <TextInput
            type="date"
            textSize="text-xs"
            width="col-span-2"
            label="Birthdate"
            errorState={errors?.employeeBirthdate?.message}
            {...register("employeeBirthdate", {
              required: "This field is required",
            })}
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-4"
            label="Place of Birth"
            placeholder="Place of Birth"
            {...register("employeeBirthplace")}
          />
          <SelectInput
            textSize="text-xs"
            width="col-span-2"
            label="Gender"
            {...register("employeeGender")}
            options={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
            ]}
          />
          <SelectInput
            textSize="text-xs"
            width="col-span-2"
            label="Civil Status"
            {...register("employeeCivilStatus")}
            options={[
              { label: "Single", value: "Single" },
              { label: "Married", value: "Married" },
              { label: "Separated", value: "Separated" },
              { label: "Widowed", value: "Widowed" },
            ]}
          />
          <SelectInput
            textSize="text-xs"
            width="col-span-2"
            label="Citizenship"
            errorState={errors?.employeeCitizenship?.message}
            {...register("employeeCitizenship", {
              required: "This field is required",
            })}
            options={citizenships.map((item) => ({
              label: item,
              value: item,
            }))}
          />
        </div>
        <div className="mt-3 px-2 w-full grid grid-cols-9 gap-x-2">
          <TextInput
            type="number"
            textSize="text-xs"
            width="col-span-1"
            label="Height (m)"
            step=".01"
            {...register("employeeHeight")}
          />
          <TextInput
            type="number"
            textSize="text-xs"
            width="col-span-1"
            label="Weight (kg)"
            step=".01"
            {...register("employeeWeight")}
          />
          <SelectInput
            textSize="text-xs"
            width="col-span-1"
            label="Blood Type"
            {...register("employeeBloodType")}
            options={[
              { label: "A", value: "A" },
              { label: "B", value: "B" },
              { label: "AB", value: "AB" },
              { label: "O", value: "O" },
            ]}
          />
          <TextInput
            type="tel"
            textSize="text-xs"
            width="col-span-2"
            label="Telephone"
            placeholder="Telephone Number"
            {...register("employeeTelephone")}
          />
          <TextInput
            type="tel"
            textSize="text-xs"
            width="col-span-2"
            label="Mobile No."
            placeholder="Mobile Number"
            {...register("employeeMobile")}
          />
          <TextInput
            type="email"
            textSize="text-xs"
            width="col-span-2"
            label="Email"
            placeholder="Email Address"
            {...register("employeeEmail")}
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
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-1"
            label="Pag-ibig ID"
            placeholder="No."
            {...register("employeePagIbig")}
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-1"
            label="PhilHealth"
            placeholder="No."
            {...register("employeePhilHealth")}
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-1"
            label="SSS"
            placeholder="No."
            {...register("employeeSSS")}
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-1"
            label="TIN"
            placeholder="No."
            {...register("employeeTIN")}
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-1"
            label="Agency Employee"
            placeholder="No."
            {...register("employeeAgencyNumber")}
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
                />
                <TextInput
                  textSize="text-xs"
                  label="Province"
                  placeholder="Address"
                  {...register("residentialProvince")}
                />
                <TextInput
                  textSize="text-xs"
                  label="City/Municipality"
                  placeholder="Address"
                  {...register("residentialCity")}
                />
                <TextInput
                  textSize="text-xs"
                  label="Barangay"
                  placeholder="Address"
                  {...register("residentialBarangay")}
                />
              </div>
              <div className="col-span-1 flex flex-col gap-y-3">
                <TextInput
                  type="number"
                  textSize="text-xs"
                  label="ZIP Code"
                  placeholder="ZIP Code"
                  {...register("residentialZIPcode")}
                />
                <TextInput
                  type="text"
                  textSize="text-xs"
                  label="Subdivision/Village"
                  placeholder="Subdivision/Village"
                  {...register("residentialSubdivision")}
                />
                <TextInput
                  type="text"
                  textSize="text-xs"
                  label="Street"
                  placeholder="Street"
                  {...register("residentialStreet")}
                />
                <TextInput
                  type="text"
                  textSize="text-xs"
                  label="House/Block/Lot No."
                  placeholder="House/Block/Lot No."
                  {...register("residentialHouseBlock")}
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
                />
                <TextInput
                  textSize="text-xs"
                  label="Province"
                  placeholder="Address"
                  {...register("permanentProvince")}
                />
                <TextInput
                  textSize="text-xs"
                  label="City/Municipality"
                  placeholder="Address"
                  {...register("permanentCity")}
                />
                <TextInput
                  textSize="text-xs"
                  label="Barangay"
                  placeholder="Address"
                  {...register("permanentBarangay")}
                />
              </div>
              <div className="col-span-1 flex flex-col gap-y-3">
                <TextInput
                  type="number"
                  textSize="text-xs"
                  label="ZIP Code"
                  placeholder="ZIP Code"
                  {...register("permanentZIPcode")}
                />
                <TextInput
                  type="text"
                  textSize="text-xs"
                  label="Subdivision/Village"
                  placeholder="Subdivision/Village"
                  {...register("permanentSubdivision")}
                />
                <TextInput
                  type="text"
                  textSize="text-xs"
                  label="Street"
                  placeholder="Street"
                  {...register("permanentStreet")}
                />
                <TextInput
                  type="text"
                  textSize="text-xs"
                  label="House/Block/Lot No."
                  placeholder="House/Block/Lot No."
                  {...register("permanentHouseBlock")}
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
        {/* FATHER */}
        <h3 className="text-xl font-light tracking-wider text-gray-500">
          Father Information
        </h3>
        <div className="mt-3 px-2 w-full grid grid-cols-10 gap-x-2">
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-3"
            label="First Name"
            errorState={errors?.fatherFirstName?.message}
            placeholder="First Name"
            {...register("fatherFirstName")}
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-3"
            label="Middle Name"
            errorState={errors?.fatherMiddleName?.message}
            placeholder="Middle Name"
            {...register("fatherMiddleName")}
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-3"
            label="Last Name"
            errorState={errors?.fatherLastName?.message}
            placeholder="Last Name"
            {...register("fatherLastName")}
          />
          <SelectInput
            textSize="text-xs"
            width="col-span-1"
            label="Name Extension"
            {...register("fatherNameExtension")}
            options={[
              { label: "", value: "" },
              { label: "Jr.", value: "Jr." },
              { label: "Sr.", value: "Sr." },
              { label: "II", value: "II" },
              { label: "III", value: "III" },
              { label: "IV", value: "IV" },
              { label: "V", value: "V" },
            ]}
          />
        </div>
        {/* MOTHER */}
        <h3 className="mt-3 text-xl font-light tracking-wider text-gray-500">
          Mother Information
        </h3>
        <div className="mt-3 px-2 w-full grid grid-cols-10 gap-x-2">
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-3"
            label="First Name"
            errorState={errors?.motherFirstName?.message}
            placeholder="First Name"
            {...register("motherFirstName")}
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-3"
            label="Middle Name"
            errorState={errors?.motherMiddleName?.message}
            placeholder="Middle Name"
            {...register("motherMiddleName")}
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-3"
            label="Last Name"
            errorState={errors?.motherLastName?.message}
            placeholder="Last Name"
            {...register("motherLastName")}
          />
          <SelectInput
            textSize="text-xs"
            width="col-span-1"
            label="Name Extension"
            {...register("motherNameExtension")}
            options={[
              { label: "", value: "" },
              { label: "Jr.", value: "Jr." },
              { label: "Sr.", value: "Sr." },
              { label: "II", value: "II" },
              { label: "III", value: "III" },
              { label: "IV", value: "IV" },
              { label: "V", value: "V" },
            ]}
          />
        </div>
        {/* SPOUSE */}
        <h3 className="mt-3 text-xl font-light tracking-wider text-gray-500">
          Spouse Information
        </h3>
        <div className="mt-3 px-2 w-full grid grid-cols-10 gap-x-2">
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-3"
            label="First Name"
            errorState={errors?.spouseFirstName?.message}
            placeholder="First Name"
            {...register("spouseFirstName")}
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-3"
            label="Middle Name"
            errorState={errors?.spouseMiddleName?.message}
            placeholder="Middle Name"
            {...register("spouseMiddleName")}
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-3"
            label="Last Name"
            errorState={errors?.spouseLastName?.message}
            placeholder="Last Name"
            {...register("spouseLastName")}
          />
          <SelectInput
            textSize="text-xs"
            width="col-span-1"
            label="Name Extension"
            {...register("spouseNameExtension")}
            options={[
              { label: "", value: "" },
              { label: "Jr.", value: "Jr." },
              { label: "Sr.", value: "Sr." },
              { label: "II", value: "II" },
              { label: "III", value: "III" },
              { label: "IV", value: "IV" },
              { label: "V", value: "V" },
            ]}
          />
        </div>
        <div className="mt-3 px-2 w-full grid grid-cols-6 gap-x-2">
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-1"
            label="Occupation"
            errorState={errors?.spouseOccupation?.message}
            placeholder="Occupation"
            {...register("spouseOccupation")}
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-2"
            label="Employer/Business Name"
            errorState={errors?.spouseEmployerBusiness?.message}
            placeholder="Employer or Business"
            {...register("spouseEmployerBusiness")}
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-2"
            label="Business Address"
            errorState={errors?.spouseBusinessAddress?.message}
            placeholder="Address"
            {...register("spouseBusinessAddress")}
          />
          <TextInput
            type="text"
            textSize="text-xs"
            width="col-span-1"
            label="Telephone"
            errorState={errors?.spouseTelephone?.message}
            placeholder="No."
            {...register("spouseTelephone")}
          />
        </div>
        {/* CHILDREN */}
        <div className="mt-3 rounded-md py-3 px-2 bg-slate-200">
          <div className="flex text-xl items-center gap-x-4">
            <h3 className="font-light tracking-wider text-gray-500">
              Children
            </h3>
            <button
              title="Add New Children"
              className="cursor-pointer px-2 py-1 bg-slate-700 text-white flex items-center gap-x-2 border border-slate-600 rounded-md hover:scale-110 active:scale-95 transition-all duration-300"
              onClick={addChild}
            >
              <FaCirclePlus className="" />
              <span className="text-xs font-medium">Add</span>
            </button>
          </div>
          <div className="mt-1 px-2 w-full mb-4">
            {childrenList?.map((child, index) => (
              <div
                key={child.key}
                className="grid grid-cols-7 items-center gap-x-2 pt-2"
              >
                <TextInput
                  type="text"
                  textSize="text-xs"
                  width="col-span-3"
                  label="Full Name"
                  errorState={
                    errors?.children?.[index]?.childrenFullName?.message
                  }
                  placeholder="Children Full Name"
                  {...register(`children.${index}.childrenFullName`, {
                    required: "This field is required",
                  })}
                />
                <SelectInput
                  textSize="text-xs"
                  width="col-span-1"
                  label="Gender"
                  {...register(`children.${index}.childrenGender`)}
                  options={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                  ]}
                />
                <TextInput
                  type="date"
                  textSize="text-xs"
                  width="col-span-1"
                  label="Birthdate"
                  errorState={
                    errors?.children?.[index]?.childrenBirthdate?.message
                  }
                  {...register(`children.${index}.childrenBirthdate`, {
                    required: "This field is required",
                  })}
                />
                <div className="col-span-2 text-lg flex items-center px-2 pt-4 gap-x-3 text-slate-700">
                  <button
                    title="Remove Children"
                    onClick={() => {
                      unregister(`children.${index}`);
                      removeChild(child.key);
                    }}
                  >
                    <FaTrash className="cursor-pointer hover:scale-125 active:scale-95 hover:text-slate-600 transition-all duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function EducationalBackgroundTab() {
    return (
      <section className="mt-3 h-[30rem] overflow-y-scroll overflow-x-hidden">
        <div className="flex text-xl items-center gap-x-4">
          <h3 className="font-light tracking-wider text-gray-500">
            Academic History
          </h3>
          <button
            title="Add New Children"
            className="cursor-pointer px-2 py-1 bg-slate-700 text-white flex items-center gap-x-2 border border-slate-600 rounded-md hover:scale-110 active:scale-95 transition-all duration-300"
            onClick={addEducation}
          >
            <FaCirclePlus className="" />
            <span className="text-xs font-medium">Add</span>
          </button>
        </div>
        <div className="mt-3 px-2 w-full flex flex-col gap-y-5">
          {educationList?.map((educations, index) => (
            <div key={educations.key} className="bg-slate-200 p-2 rounded-md">
              <div className="grid grid-cols-12 gap-x-2 items-center">
                <SelectInput
                  textSize="text-xs"
                  width="col-span-3"
                  label="School Level"
                  {...register(`educations.${index}.educationLevel`)}
                  options={[
                    { label: "Elementary", value: "Elementary" },
                    { label: "Secondary", value: "Secondary" },
                    { label: "Vocational/Trade", value: "Vocational/Trade" },
                    { label: "College", value: "College" },
                    { label: "Graduate Studies", value: "Graduate Studies" },
                  ]}
                />
                <TextInput
                  type="text"
                  textSize="text-xs"
                  width="col-span-4"
                  label="Name of School"
                  placeholder="Write in Full"
                  errorState={
                    errors?.educations?.[index]?.educationSchoolName?.message
                  }
                  {...register(`educations.${index}.educationSchoolName`, {
                    required: "This field is required",
                  })}
                />
                <TextInput
                  type="text"
                  textSize="text-xs"
                  width="col-span-4"
                  label="Basic Education/Degree/Course"
                  placeholder="Write in Full"
                  errorState={
                    errors?.educations?.[index]?.educationDegreeCourse?.message
                  }
                  {...register(`educations.${index}.educationDegreeCourse`, {
                    required: "This field is required",
                  })}
                />
                <div className="col-span-1 self-start text-2xl flex justify-end pt-1 pe-1 gap-x-3 text-slate-700">
                  <button
                    title="Remove Education Info"
                    onClick={() => {
                      unregister(`educations.${index}`);
                      removeEducation(educations.key);
                    }}
                  >
                    <FaTrash className="cursor-pointer hover:scale-125 active:scale-95 hover:text-slate-600 transition-all duration-300" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-x-2 items-center">
                <TextInput
                  type="number"
                  textSize="text-xs"
                  width="col-span-1"
                  label="From"
                  placeholder="YYYY"
                  min="1900"
                  max="2100"
                  step="1"
                  errorState={
                    errors?.educations?.[index]?.educationAttendFrom?.message
                  }
                  {...register(`educations.${index}.educationAttendFrom`)}
                />
                <TextInput
                  type="number"
                  textSize="text-xs"
                  width="col-span-1"
                  label="To"
                  placeholder="YYYY"
                  min="1900"
                  max="2100"
                  step="1"
                  errorState={
                    errors?.educations?.[index]?.educationAttendTo?.message
                  }
                  {...register(`educations.${index}.educationAttendTo`)}
                />
                <TextInput
                  type="text"
                  textSize="text-xs"
                  width="col-span-3"
                  label="Highest Level/Units Earned"
                  placeholder="Leave blank if not graduated"
                  errorState={
                    errors?.educations?.[index]?.educationLevelEarned?.message
                  }
                  {...register(`educations.${index}.educationLevelEarned`)}
                />
                <TextInput
                  type="number"
                  textSize="text-xs"
                  width="col-span-2"
                  label="Year Graduated"
                  placeholder="YYYY"
                  min="1900"
                  max="2100"
                  step="1"
                  errorState={
                    errors?.educations?.[index]?.educationYearGraduated?.message
                  }
                  {...register(`educations.${index}.educationYearGraduated`)}
                />
                <TextInput
                  type="text"
                  textSize="text-xs"
                  width="col-span-5"
                  label="Scholarships/Academic Honors Received"
                  placeholder="Input here"
                  errorState={
                    errors?.educations?.[index]?.educationHonorsReceived
                      ?.message
                  }
                  {...register(`educations.${index}.educationHonorsReceived`)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  function CivilServiceTab() {
    return (
      <section className="mt-3 h-[30rem] overflow-y-scroll overflow-x-hidden">
        <div className="flex text-xl items-center gap-x-4">
          <h3 className="font-light tracking-wider text-gray-500">
            Government Employment Eligibilities
          </h3>
          <button
            title="Add New Eligibility"
            className="cursor-pointer px-2 py-1 bg-slate-700 text-white flex items-center gap-x-2 border border-slate-600 rounded-md hover:scale-110 active:scale-95 transition-all duration-300"
            onClick={addEligibility}
          >
            <FaCirclePlus className="" />
            <span className="text-xs font-medium">Add</span>
          </button>
        </div>
        <div className="mt-3 px-2 w-full flex flex-col gap-y-5">
          {eligibilityList?.map((eligibilities, index) => (
            <div
              key={eligibilities.key}
              className="bg-slate-200 p-2 rounded-md"
            >
              <div className="grid grid-cols-13 gap-x-2 items-center">
                <TextInput
                  type="text"
                  textSize="text-xs"
                  width="col-span-4"
                  label="Examination"
                  placeholder="Career Service/RA 1080 (BOARD/BAR) Under Special Laws/CES/CSEE/Driver's License"
                  errorState={
                    errors?.eligibilities?.[index]?.eligibilityExamName?.message
                  }
                  {...register(`eligibilities.${index}.eligibilityExamName`, {
                    required: "This field is required",
                  })}
                />
                <TextInput
                  type="number"
                  textSize="text-xs"
                  width="col-span-1"
                  label="Rating"
                  placeholder="00.00"
                  step=".01"
                  errorState={
                    errors?.eligibilities?.[index]?.eligibilityExamRating
                      ?.message
                  }
                  {...register(`eligibilities.${index}.eligibilityExamRating`)}
                />
                <TextInput
                  type="date"
                  textSize="text-xs"
                  width="col-span-2"
                  label="Date of Examination"
                  errorState={
                    errors?.eligibilities?.[index]?.eligibilityExamDate?.message
                  }
                  {...register(`eligibilities.${index}.eligibilityExamDate`)}
                />
                <TextInput
                  type="text"
                  textSize="text-xs"
                  width="col-span-2"
                  label="Place of Exam"
                  placeholder="Address"
                  errorState={
                    errors?.eligibilities?.[index]?.eligibilityExamPlace
                      ?.message
                  }
                  {...register(`eligibilities.${index}.eligibilityExamPlace`)}
                />
                <TextInput
                  type="text"
                  textSize="text-xs"
                  width="col-span-2"
                  label="License"
                  placeholder="No."
                  errorState={
                    errors?.eligibilities?.[index]?.eligibilityLicenseNumber
                      ?.message
                  }
                  {...register(
                    `eligibilities.${index}.eligibilityLicenseNumber`
                  )}
                />
                <TextInput
                  type="number"
                  textSize="text-xs"
                  width="col-span-1"
                  label="Validity"
                  placeholder="YYYY"
                  min="1900"
                  max="2100"
                  step="1"
                  errorState={
                    errors?.eligibilities?.[index]?.eligibilityLicenseValidity
                      ?.message
                  }
                  {...register(
                    `eligibilities.${index}.eligibilityLicenseValidity`
                  )}
                />
                <div className="col-span-1 self-start text-2xl flex justify-end pt-1 pe-1 gap-x-3 text-slate-700">
                  <button
                    title="Remove Eligibility"
                    onClick={() => {
                      unregister(`eligibilities.${index}`);
                      removeEligibility(eligibilities.key);
                    }}
                  >
                    <FaTrash className="cursor-pointer hover:scale-125 active:scale-95 hover:text-slate-600 transition-all duration-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  function WorkExperienceTab() {
    return (
      <section className="mt-3 h-[30rem] overflow-y-scroll overflow-x-hidden">
        <div className="flex text-xl items-center gap-x-4">
          <h3 className="font-light tracking-wider text-gray-500">
            Employment/Work History
          </h3>
          <button
            title="Add New Work History"
            className="cursor-pointer px-2 py-1 bg-slate-700 text-white flex items-center gap-x-2 border border-slate-600 rounded-md hover:scale-110 active:scale-95 transition-all duration-300"
            onClick={addWorkExperience}
          >
            <FaCirclePlus className="" />
            <span className="text-xs font-medium">Add</span>
          </button>
        </div>
        <div className="mt-3 px-2 w-full flex flex-col gap-y-5">
          {workExperienceList?.map((workExperiences, index) => (
            <div
              key={workExperiences.key}
              className="bg-slate-200 p-2 rounded-md"
            >
              <div className="grid grid-cols-12 gap-x-2 items-center">
                <TextInput
                  type="text"
                  textSize="text-xs"
                  width="col-span-4"
                  label="Department/Agency/Office/Company"
                  placeholder="Write in Full/Do not abbreviate"
                  errorState={
                    errors?.workExperiences?.[index]?.workCompany?.message
                  }
                  {...register(`workExperiences.${index}.workCompany`, {
                    required: "This field is required",
                  })}
                />
                <TextInput
                  type="text"
                  textSize="text-xs"
                  width="col-span-2"
                  label="Position Title"
                  placeholder="Position Title"
                  errorState={
                    errors?.workExperiences?.[index]?.workPosition?.message
                  }
                  {...register(`workExperiences.${index}.workPosition`, {
                    required: "This field is required",
                  })}
                />
                <TextInput
                  type="date"
                  textSize="text-xs"
                  width="col-span-2"
                  label="From"
                  errorState={
                    errors?.workExperiences?.[index]?.workFrom?.message
                  }
                  {...register(`workExperiences.${index}.workFrom`)}
                />
                <TextInput
                  type="date"
                  textSize="text-xs"
                  width="col-span-2"
                  label="To"
                  errorState={
                    errors?.workExperiences?.[index]?.workFrom?.message
                  }
                  {...register(`workExperiences.${index}.workFrom`)}
                />
                <div className="col-span-2 self-start text-2xl flex justify-end pt-1 pe-1 gap-x-3 text-slate-700">
                  <button
                    title="Remove Eligibility"
                    onClick={() => {
                      unregister(`workExperiences.${index}`);
                      removeWorkExperience(workExperiences.key);
                    }}
                  >
                    <FaTrash className="cursor-pointer hover:scale-125 active:scale-95 hover:text-slate-600 transition-all duration-300" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-x-2 items-center mt-2">
                <TextInput
                  type="number"
                  textSize="text-xs"
                  width="col-span-2"
                  label="Monthly Salary"
                  placeholder="₱"
                  errorState={
                    errors?.workExperiences?.[index]?.workMonthlySalary?.message
                  }
                  {...register(`workExperiences.${index}.workMonthlySalary`)}
                />
                <TextInput
                  type="text"
                  textSize="text-xs"
                  width="col-span-2"
                  label="Salary/Job/Pay Grade"
                  placeholder="00-0"
                  errorState={
                    errors?.workExperiences?.[index]?.workPayGrade?.message
                  }
                  {...register(`workExperiences.${index}.workPayGrade`)}
                />
                <SelectInput
                  textSize="text-xs"
                  width="col-span-2"
                  label="Status of Appointment"
                  {...register(
                    `workExperiences.${index}.workAppointmentStatus`
                  )}
                  options={[
                    { label: "Permanent", value: "Permanent" },
                    { label: "Job Order", value: "Job Order" },
                    { label: "Regular", value: "Regular" },
                    { label: "Probationary", value: "Probationary" },
                    { label: "Part-time", value: "Part-time" },
                    { label: "Temporary", value: "Temporary" },
                  ]}
                />
                <SelectInput
                  textSize="text-xs"
                  width="col-span-2"
                  label="Government Service"
                  {...register(`workExperiences.${index}.workGovtService`)}
                  options={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
};
CreateForm.propTypes = {
  onClose: PropTypes.func,
  employeeData: PropTypes.object,
};

export default CreateForm;
