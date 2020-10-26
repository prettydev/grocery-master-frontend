import { useMapState } from "../context/store";

const useUser = () => {
  const {
    mapState: { user },
  } = useMapState();

  return user;
}

export default useUser;