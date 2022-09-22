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

export async function getServerSideProps(context) {
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

const PostPage = ({ posts }) => {
  console.log(posts);
  return (
    <div className="flex items-center justify-center ">
      <PostList posts={posts} />
    </div>
  );
};

export default PostPage;
