import { useState, useEffect } from "react";

export default function People() {
  const [people, setPeople] = useState([]);

  /*
  const request = fetch("https://jsonplaceholder.typicode.com/users");
  request.then((response) => {
    // At this stage the data is fetched
    // but we still need to parse the json
    const json = response.json();
    // Use then keyword again bc. parsing the json takes time
    json.then((json) => {
      console.log(json);
    });
  });
  */

  /*
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((json) => console.log(json));
*/

  // Fetch user data and keep in state variable
  // users data might chance so it makes sense to put it into a state variable
  // Clean way to fetch using async, await
  // Cleaner the above commented blocks of code
  const getPeople = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const json = await response.json();
    setPeople(json);
  };

  // Only fetch when page reloads
  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div>
      <h2>People</h2>
      <ul>
        {people.map((person) => {
          return <li key={person.id}>{person.name}</li>;
        })}
      </ul>
    </div>
  );
}
