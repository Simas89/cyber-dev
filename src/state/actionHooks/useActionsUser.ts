import { useMemo } from "react";
import { slice } from "state/reducers/user";
import { bindActionCreators } from "redux";
import { useStateDispatch } from "state";

const useActionsUser = () => {
  const { actions } = slice;
  const dispatch = useStateDispatch();

  return useMemo(
    () => bindActionCreators(actions, dispatch),
    [actions, dispatch]
  );
};

export default useActionsUser;
