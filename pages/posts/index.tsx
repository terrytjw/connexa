import {
  collectionGroup,
  getFirestore,
  query,
  where,
  limit,
  getDocs,
  orderBy,
  postToJSON,
  onSnapshot,
} from "../../lib/firebase";
import PostList from "../../components/Posts";

// Number of posts to be shown
const LIMIT = 1;

type Post = {
  questionTitle: string;
  content: string;
  imageURL: string;
  heartCount: number;
  photoURL: string;
  username: string;
  createdAt: number;
  slug: string;
  uid: string;
  displayName: string;
};

type Props = {
  posts: Post[];
};

export async function getServerSideProps() {
  const ref = collectionGroup(getFirestore(), "posts");
  const postsQuery = query(ref, orderBy("createdAt", "desc"), limit(LIMIT));

  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);
  return {
    props: { posts }, // will be passed to the page component as props
  };
}

const PostPage = ({ posts }: Props) => {
  // const [posts, setPosts] = useState<Post[]>([]);

  return (
    <div className="flex items-center justify-center ">
      <PostList posts={posts} />
    </div>
  );
};

export default PostPage;

// onSnapshot(postsQuery, (snapShot) => {
//   const postsInternal: Post[] = [];
//   snapShot.forEach((doc) => {
//     postsInternal.push(doc.data());
//   });
//   setPosts(postsInternal);
// });
