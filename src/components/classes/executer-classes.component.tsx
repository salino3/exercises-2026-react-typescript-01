import type React from "react";
import { Worker } from "./classes.component";

export const ExecuterClasses: React.FC = () => {
  const worker01 = new Worker("Joe", "Doe", 32, "waiter", 1200);

  console.log(worker01.getName());
  console.log(worker01.salary);
};
