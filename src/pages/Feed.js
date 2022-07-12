import Shell from "../components/Shell";
import CreatePost from "../components/CreatePost";
const feed = () => {
  return (
    <Shell>
      <div className="feed">
        <CreatePost />
      </div>
    </Shell>
  );
};

export default feed;
