import Shell from "../components/Shell";
import CreatePost from "../components/CreatePost";
import FeedEntries from "../components/FeedEntries";
const feed = () => {
  return (
    <Shell>
      <div className="feed">
        <CreatePost />
        <FeedEntries />
      </div>
    </Shell>
  );
};

export default feed;
