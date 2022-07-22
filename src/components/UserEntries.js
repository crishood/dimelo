import Entry from "./Entry";

const ProfileEntries = ({ entries, artistName, role, picture }) => {
  return (
    <div className="profile-entries-container">
      {entries
        .map((entry) => {
          return (
            <Entry
              key={entry._id}
              id={entry._id}
              name={artistName}
              role={role}
              avatar={picture}
              description={entry.description}
              picture={entry.picture}
              audio={entry.audio}
              date={entry.createdAt}
            />
          );
        })
        .reverse()}
    </div>
  );
};

export default ProfileEntries;
