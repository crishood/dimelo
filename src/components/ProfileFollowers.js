import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchFollow } from "../slices/userEntriesSlice";
import { useEffect } from "react";

const ProfileFollowers = () => {
  const dispatch = useDispatch();
  const followers = useSelector(
    (state) => state.userEntries.followers,
    shallowEqual
  );
  const following = useSelector(
    (state) => state.userEntries.following,
    shallowEqual
  );
  useEffect(() => {
    dispatch(fetchFollow());
  }, []);

  return (
    <div className="profile-followers">
      <span>{followers.length} seguidores</span>
      <span>{following.length} siguiendo</span>
    </div>
  );
};

export default ProfileFollowers;
