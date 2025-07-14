import { useLocation } from "react-router-dom";

export function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  return <div>Showing results for: <strong>{query}</strong></div>;
}
