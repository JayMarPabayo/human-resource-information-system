import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdateUserPasswordForm from "../features/authentication/UpdateUserPasswordForm";

const Account = () => {
  return (
    <>
      <h3 className="text-slate-700 font-medium text-base">
        Account Management
      </h3>
      <div className="flex justify-between gap-3">
        <UpdateUserDataForm />
        <UpdateUserPasswordForm />
      </div>
    </>
  );
};

export default Account;
