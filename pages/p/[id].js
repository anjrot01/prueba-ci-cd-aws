import Layout from "../../components/MyLayout";
import axios from "axios";
import Markdown from "react-markdown";

const Post = ({ show }) => {
  return (
    <Layout>
      <h1>{show.name}</h1>
      <p>{show.summary.replace(/<[/]?[pb]>/g, "")}</p>
      {show.image ? <img src={show.image.medium} /> : null}

      <div className="markdown">
        <Markdown
          source={`
This is our blog post.
Yes. We can have a [link](/link).
And we can have a title as well.

### This is a title

And here's the content.
      `}
        />
      </div>
      <style jsx global>{`
        .markdown {
          font-family: "Arial";
        }

        .markdown a {
          text-decoration: none;
          color: blue;
        }

        .markdown a:hover {
          opacity: 0.6;
        }

        .markdown h3 {
          margin: 0;
          padding: 0;
          text-transform: uppercase;
        }
      `}</style>
    </Layout>
  );
};

Post.getInitialProps = async context => {
  const { id } = context.query;

  const res = await axios.get(`https://api.tvmaze.com/shows/${id}`);
  const show = res.data;

  console.log("respuesta Axios id :", show.name);

  return { show };
};

export default Post;
