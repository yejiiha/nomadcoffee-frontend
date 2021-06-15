import { useEffect } from "react";
import { useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserOut } from "../apollo";
import { SEE_ME } from "./Queries";
import { useHistory } from "react-router";

function useUser() {
  const history = useHistory();
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(SEE_ME, {
    skip: !hasToken,
  });
  useEffect(() => {
    if (data?.me === null) {
      logUserOut(history);
    }
  }, [data, history]);
  return { data };
}

export default useUser;
