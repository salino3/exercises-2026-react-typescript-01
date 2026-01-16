import { useEffect, useState } from "react";

export interface AddressProps {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface UserProps {
  id: number | null;
  name: string;
  username: string;
  email: string;
  address: AddressProps;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export function UserProfile(props: { userId: string }) {
  const [userData, setUserData] = useState<UserProps>({
    id: null,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });
  console.log("clog1", userData.name);

  //
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${props.userId}`)
      .then((res) => res.json())
      .then((data: UserProps) => setUserData(data));
  }, [props.userId]);

  if (!userData.name) return <p>Loading...</p>;

  return (
    <div>
      <h2>{userData.name}</h2>
      <p> {userData.email}</p>
    </div>
  );
}
