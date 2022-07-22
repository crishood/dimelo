import Entry from "./Entry";
import { Loader } from "@mantine/core";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchFeed, fetchAllUsers } from "../slices/usersSlice";
import { useEffect } from "react";

const FeedEntries = () => {
  const entries = useSelector((state) => state.users.entries, shallowEqual);
  const loading = useSelector((state) => state.ui.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeed());
    dispatch(fetchAllUsers());
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

export default FeedEntries;
