import type React from "react";

interface GreetingProps {
  name?: string;
}

export const Greeting: React.FC<GreetingProps> = (props) => {
  return <h1>Hello, {props.name || "World"}</h1>;
};
