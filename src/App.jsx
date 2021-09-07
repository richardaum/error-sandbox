import React from "react";

const useQuery = () => {
  const [isError, setError] = React.useState(false);
  const [data, setData] = React.useState({ myAwesomeProperty: [] });

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setError(true);
      setData(undefined);
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  return { data, isError };
};

const App = () => {
  return <Parent />;
};

const Parent = () => {
  const { isError } = useQuery();
  return isError ? <Error /> : <Child />;
};

const Child = () => {
  const { isError, data } = useQuery();

  if (isError) return null;

  return (
    <pre>
      <code>{JSON.stringify(data.myAwesomeProperty)}</code>
    </pre>
  );
};

const Error = () => {
  return <div>Error</div>;
};

export default App;
