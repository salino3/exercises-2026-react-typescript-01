import { useEffect, useState } from "react";
import { BoxBaseInput } from "../box-input/box-input.component";
import type { Role, User } from "../../../../App";
import styles from "./form.module.scss";

interface Props {
  usersData: User[];
  setUsersData: React.Dispatch<React.SetStateAction<User[]>>;
}

export interface UserForm {
  id: number | null;
  name: string;
  username: string;
  email: string;
  role: Role;
}

const intialFormData: UserForm = {
  id: null,
  name: "",
  username: "",
  email: "",
  role: "user",
};

export const FormTasks: React.FC<Props> = ({ usersData, setUsersData }) => {
  const [formData, setFormData] = useState<UserForm>(intialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof UserForm, string>>>(
    {},
  );
  const [submitStatus, setSubmitStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const hanldeFormData =
    (key: keyof UserForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = event.target;

      if (errors[key]) {
        setErrors((prev) => {
          const { [key]: deletedKey, ...remainingErrors } = prev;

          return remainingErrors;
        });
      }

      if (key === "role") {
        setFormData((prev) => ({
          ...prev,
          [key]: checked ? "subscriber" : "user",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [key]: value,
        }));
      }
    };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UserForm, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //
  function hanldeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus("Please fix the errors before submitting");
      return;
    }
    setIsLoading(true);

    setUsersData((prev) => [...prev, { ...formData, id: Date.now() }]);

    setFormData(intialFormData);
    setErrors({});
    setSubmitStatus(`User ${formData.name} added successfully`);

    setTimeout(() => {
      setSubmitStatus("");
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={styles.rootFormTasks}>
      <form
        onSubmit={hanldeSubmit}
        className={styles.formTasks}
        aria-label="User registration form"
        noValidate
      >
        <fieldset disabled={isLoading} className={styles.formFieldset}>
          <legend>Add New User</legend>

          <BoxBaseInput
            lbl="Name"
            name="name"
            type="text"
            change={hanldeFormData("name")}
            value={formData.name}
            customStyles={styles.inputName}
            required={true}
            error={errors.name}
            ariaDescribedBy="name-hint"
          />

          <BoxBaseInput
            lbl="Email"
            name="email"
            type="email"
            change={hanldeFormData("email")}
            value={formData.email}
            customStyles={styles.inputEmail}
            required={true}
            error={errors.email}
            ariaDescribedBy="email-hint"
          />

          <BoxBaseInput
            lbl="Username"
            name="username"
            type="text"
            change={hanldeFormData("username")}
            value={formData.username}
            customStyles={styles.inputUsername}
            required={true}
            error={errors.username}
            ariaDescribedBy="username-hint"
          />

          <BoxBaseInput
            lbl="Subscriber ?"
            name="role"
            type="checkbox"
            change={hanldeFormData("role")}
            checked={formData.role === "subscriber"}
            customStyles={styles.inputRole}
            ariaDescribedBy="role-hint"
          />

          <button type="submit" aria-label="Submit user data">
            Submit Data
          </button>
        </fieldset>

        <span
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={styles.submitStatus}
          style={{
            height: "24px",
          }}
        >
          {submitStatus}
        </span>
      </form>

      <p aria-live="polite" aria-atomic="true" role="status">
        Current count:
        <span className="sr-only">
          {usersData.length === 0
            ? "No users added yet"
            : ` ${usersData.length} user${usersData.length > 1 ? "s" : ""} in the list`}
        </span>
      </p>
    </div>
  );
};
