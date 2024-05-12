import SignupForm from "../features/authentication/SignupForm";

const Users = () => {
  return (
    <div>
      <section className="flex justify-between items-center">
        <h6 className="font-medium text-base text-slate-700">Users</h6>
      </section>
      <SignupForm />
    </div>
  );
};

export default Users;
