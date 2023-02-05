import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { TokenContext } from "../../context/TokenContext";

export const Posts = () => {
  const [posts, setPost] = useState([]);
  const [postModal, setPostModal] = useState(false);
  const [handleFunc, setHandleFunc] = useState("handleSubmit");
  const [postId, setPostId] = useState("");
  const post = useRef();
  const desc = useRef();
  const { token } = useContext(TokenContext);

  useEffect(() => {
    axios
      .get("http://localhost:8080/posts")
      .then((data) => {
        if (data.status === 200) {
          setPost(data.data);
        }
      })
      .catch((err) => console.log(err));
  }, [posts]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    axios
      .post("http://localhost:8080/posts", {
        name: post.current.value,
        desc: desc.current.value,
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    post.current.value = "";
    desc.current.value = "";
    setPostModal(false);
  };

  const handleEditSubmit = (evt) => {
    evt.preventDefault();

    axios
      .put(`http://localhost:8080/posts/${postId}`, {
        name: post.current.value,
        desc: desc.current.value,
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    post.current.value = "";
    desc.current.value = "";
    setPostModal(false);
  };

  const simpleForm = (
    <form
      onSubmit={(evt) =>
        handleFunc === "handleSubmit"
          ? handleSubmit(evt)
          : handleEditSubmit(evt)
      }
    >
      <input
        ref={post}
        className="form-control mb-3"
        placeholder="Post"
        type="text"
      />
      <input
        ref={desc}
        className="form-control mb-3"
        placeholder="Description"
        type="text"
      />
      <button className="btn btn-success">SEND</button>
    </form>
  );

  const handleEdit = (evt) => {
    setPostModal(true);
    setHandleFunc("handleEditSubmit");

    axios
      .get(`http://localhost:8080/posts/${evt.target.dataset.postId}`)
      .then((data) => {
        if (data.status === 200) {
          post.current.value = data.data?.name;
          desc.current.value = data.data?.desc;
        }
      })
      .catch((err) => console.log(err));

    <Modal
      title="Edite post"
      setModal={setPostModal}
      modal={postModal}
      body={simpleForm}
    />;
  };

  const handleDelete = (evt) => {
    axios.delete(`http://localhost:8080/posts/${evt.target.dataset.postId}`);
  };

  return (
    <div className="container my-5">
      <div className="d-flex align-items-center justify-content-center">
        <h2 className="h2 text-center fw-bold my-5 me-5">POSTS</h2>
        {token ? (
          <button
            onClick={() => {
              setPostModal(true);
              setHandleFunc("handleSubmit");
            }}
            className="btn btn-secondary"
          >
            Add Post+
          </button>
        ) : (
          ""
        )}
      </div>

      {posts.length ? (
        <ul className="list-unstyled m-0 row gap-3 justify-content-center">
          {posts.map((post) => (
            <li
              key={post.id}
              className="col-12 col-lg-3 py-5 px-3 shadow rounded"
            >
              <h3>{post.name} </h3>
              <p>{post.desc} </p>
              {token ? (
                <div className="mt-5">
                  <button
                    onClick={(evt) => {
                      handleEdit(evt);
                      setPostId(evt.target.dataset.postId);
                    }}
                    className="btn btn-warning "
                    data-post-id={post.id}
                  >
                    EDIT
                  </button>
                  <button
                    onClick={(evt) => handleDelete(evt)}
                    className="btn btn-danger ms-3"
                    data-post-id={post.id}
                  >
                    DELETE
                  </button>
                </div>
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}

      <Modal
        title="Add Post"
        modal={postModal}
        setModal={setPostModal}
        body={simpleForm}
      />
    </div>
  );
};
