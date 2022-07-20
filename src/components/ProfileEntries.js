import Entry from "./Entry";
import { Loader } from "@mantine/core";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchEntries } from "../slices/userEntriesSlice";
import { useEffect } from "react";

const ProfileEntries = () => {
  const entries = useSelector(
    (state) => state.userEntries.entries,
    shallowEqual
  );
  const loading = useSelector((state) => state.ui.loading);
  const dispatch = useDispatch();
  useEffect(() => {
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
                name={entry.user[0].artistName}
                role={entry.user[0].role}
                avatar={entry.user[0].picture}
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
