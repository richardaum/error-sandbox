import axios from "axios";
import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 30000,
      staleTime: Infinity,
      retry: 0,
    },
  },
});

const useMyQuery = () =>
  useQuery(
    "period",
    async () => {
      const { data } = await axios.get(`http://http.us/500`);
      return data;
    },
    { placeholderData: { aggregations: [] } }
  );

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Parent />
    </QueryClientProvider>
  );
};

const Parent = () => {
  const { isError } = useMyQuery();
  console.log("Parent", JSON.stringify({ isError }));
  return isError ? <Error /> : <Child />;
};

const Child = () => {
  const { data: periods, isError } = useMyQuery();
  console.log("Child", JSON.stringify({ periods, isError }));
  return (
    <pre>
      <code>{JSON.stringify(periods.aggregations)}</code>
    </pre>
  );
};

const Error = () => {
  return <div>Error</div>;
};

export default App;
