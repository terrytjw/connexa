import {
  collectionGroup,
  getFirestore,
  query,
  where,
  limit,
  getDocs,
  orderBy,
} from "firebase/firestore";
import PostList from "../../components/Posts";
import { postToJSON } from "../../lib/firebase";

// Number of posts to be shown
const LIMIT = 8;

type Post = {
  questionTitle: string;
  content: string;
  imageURL: string;
  heartCount: number;
  username: string;
  createdAt: number;
  slug: string;
};

type Props = {
  posts: Post[];
};

export async function getServerSideProps() {
  // const postsQuery = firestore
  //   .collectionGroup('posts')
  //   .where('published', '==', true)
  //   .orderBy('createdAt', 'desc')
  //   .limit(LIMIT);
  const ref = collectionGroup(getFirestore(), "posts");
  const postsQuery = query(ref, orderBy("createdAt", "desc"), limit(LIMIT));

  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

const PostPage = ({ posts }: Props) => {
  console.log(posts);
  return (
    <div className="flex items-center justify-center ">
      <PostList posts={posts} />
    </div>
  );
};

export default PostPage;
