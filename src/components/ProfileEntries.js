import Entry from "./Entry";
import { Loader } from "@mantine/core";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchEntries } from "../slices/userEntriesSlice";
import { useEffect } from "react";
import { setEntries } from "../slices/userEntriesSlice";

const ProfileEntries = () => {
  const entries = useSelector(
    (state) => state.userEntries.entries,
    shallowEqual
  );
  const loading = useSelector((state) => state.ui.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setEntries([]));
    dispatch(fetchEntries());
  }, []);
  return (
    <div className="profile-entries-container">
      {loading ? (
        <Loader />
      ) : (
        entries
          .map((entry) => {
            return (
              <Entry
                key={entry._id}
                id={entry._id}
                name={entry.user.artistName}
                role={entry.user.role}
                avatar={entry.user.picture}
                description={entry.description}
                picture={entry.picture}
                audio={entry.audio}
                date={entry.createdAt}
              />
            );
          })
          .reverse()
      )}
    </div>
  );
};

export default ProfileEntries;
