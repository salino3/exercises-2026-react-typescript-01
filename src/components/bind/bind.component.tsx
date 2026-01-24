export const BindComponent = () => {
  // We add 'this: { name: string }' as the first parameter.
  // This is ONLY for TypeScript; it disappears when the code runs.
  function introduce(
    this: { name: string },
    surname: string | null,
    age: number,
  ) {
    console.log(`User: ${this.name} ${surname}, Age: ${age}`);
  }

  const userObj = { name: "Lucas" };

  // 2. BIND: The first argument 'userObj' now matches the 'this' type above
  const greetSilva = introduce.bind(userObj, "Silva");

  // 3. EXECUTION
  greetSilva(28);

  // 4. PASSING NULL AS SURNAME
  // Note: I updated the type to 'string | null' so TS doesn't complain
  const greetNoSurname = introduce.bind(userObj, null);
  //   const attemptToFix = greetNoSurname.bind(userObj, "Silva"); // This won't work!
  greetNoSurname(30);

  return <div>Check the console!</div>;
};
