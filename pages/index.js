import Layout from "../components/MyLayout";
import Link from "next/link";
import axios from "axios";

const PostLink = ({ post }) => (
  <li>
    <Link href="/p/[id]" as={`/p/${post.id}`}>
      <a>{post.name}</a>
    </Link>
    <style jsx>{`
      a {
        font-family: "Arial";
      }
      ul {
        padding: 0;
      }
      li {
        list-style: none;
        margin: 5px 0;
      }
      a {
        text-decoration: none;
        color: green;
      }
      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </li>
);

const Index = ({ shows }) => {
  console.log("props<<< :", shows);
  return (
    <Layout>
      <h1>Batman Tv Shows</h1>

      <ul>
        {shows.map(show => (
          <PostLink key={show.id} post={show} />
        ))}
      </ul>
      <style jsx>
        {`
          h1 {
            font-family: "Arial";
          }
        `}
      </style>
    </Layout>
  );
};

Index.getInitialProps = async () => {
  const res = await axios.get("https://api.tvmaze.com/search/shows?q=batman");

  console.log("Show datos de Axios :", res.data);

  return {
    shows: res.data.map(entry => entry.show)
  };
};

export default Index;
