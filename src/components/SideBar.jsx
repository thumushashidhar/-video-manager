import axios from "axios";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { v4 as uuidV4 } from "uuid";
import "../App.css";
import Card from "./Card";

const SideBar = ({ children }) => {
  const [input, setInput] = useState("");
  const [bucket, setBucket] = useState();
  const [editBucket, setEditBucket] = useState(null);
  const [isloading, setLoading] = useState(true);
  const [bucketId, setBucketId] = useState(null);
  const [bucketTitle, setBucketTitle] = useState(null);
  // const sendId = (id) =>
  // {
  //   setBucketId(id);
  // }
  
  const handleDelete = async (id) => {
    try
    {
      console.log(`http://localhost:8000/buckets/${id}`);
      await axios.delete(`http://localhost:8000/buckets/${id}`);
      setBucket(bucket.filter((b) => b.id !== id));
    } catch (error) {
      console.error(error);
    }
    setLoading(!isloading);
  };

  const onEditChange = (event) => {
    setInput(event.target.value);
  };
  const onEditSubmit = (event) => {   
    event.preventDefault();
    const handleEdit = async () => {
      return await axios.put(`http://localhost:8000/buckets/${editBucket.id}`, {
        title: input,
      });
    };
    handleEdit();
    setEditBucket(null);
    setInput("");
    setLoading(!isloading);
  };
  const handleEdit = (buck) => {
    setEditBucket(buck);
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onInputSubmit = (event) => {
    event.preventDefault();
    if (!editBucket) {
      const postBucket = async () => {
        return await axios.post("http://localhost:8000/buckets", {
          title: input,
          id: uuidV4(),
          card: [],
        });
      };
      postBucket();
      setInput("");
      setLoading(!isloading);
    } else {
      const handleEdit = async (id) => {
        return await axios.put(`http://localhost:8000/buckets/${id}`, {
          title: input,
          id: id,
        });
      };
      handleEdit();
      setInput("");
    }
  };
  useEffect(() => {
    if (editBucket) {
      setInput(editBucket.title);
    } else {
      setInput("");
    }
  }, [setInput, editBucket]);

  useEffect(() => {
    fetch("http://localhost:8000/buckets")
      .then((response) => response.json())
      .then((data) => setBucket(data))
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/buckets")
      .then((response) => response.json())
      .then((data) => setBucket(data))
      .catch((error) => console.error(error));
  }, [isloading]);

  const isOpen = true;
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "300px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Bucket List
                </motion.h1>
              )}

              <button
                type="button"
                class="btn btn-light add-bucket-button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Add Bucket
              </button>

              <form onSubmit={onInputSubmit}>
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        {editBucket ? (
                          <h2 className="modal-header-title">
                            Editing Bucket List
                          </h2>
                        ) : (
                          <h2 className="modal-header-title">
                            Adding Bucket List
                          </h2>
                        )}
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div class="input-group mb-3">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter bucket title"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            value={input}
                            required
                            onChange={onInputChange}
                          />
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        {editBucket ? (
                          <button
                            type="submit"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                          >
                            Edit Bucket
                          </button>
                        ) : (
                          <button
                            type="submit"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                          >
                            Add Bucket
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <form onSubmit={onEditSubmit}>
                <div
                  class="modal fade"
                  id="editModel"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        {editBucket ? (
                          <h2 className="modal-header-title">
                            Editing Bucket List
                          </h2>
                        ) : (
                          <h2 className="modal-header-title">
                            Editing Bucket List
                          </h2>
                        )}
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div class="input-group mb-3">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter bucket title"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            value={input}
                            required
                            onChange={onEditChange}
                          />
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        {editBucket ? (
                          <button
                            type="submit"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                          >
                            Edit Bucket
                          </button>
                        ) : (
                          <button
                            type="submit"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                          >
                            Edit Bucket
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </AnimatePresence>
          </div>

          
          <div>
            {bucket &&
              bucket.map((buck, index) =>
              {
                
                return (
                  <>
                    <div
                      className="bucket-div"
                      id={buck.id}
                      onClick={() => {
                        setBucketId(buck.id);
                        setBucketTitle(buck.title);
                      }}
                    >
                      {buck.title}{" "}
                      <div>
                        <AiTwotoneEdit
                          type="button"
                          class="btn-light icon"
                          data-bs-toggle="modal"
                          data-bs-target="#editModel"
                          onClick={() => handleEdit(buck)}
                        />
                        <AiFillDelete
                          type="button"
                          class="btn-light icon"
                          onClick={() => handleDelete(buck.id)}
                        />
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </motion.div>

        <Card buckId={ bucketId }  isloading={isloading} title={bucketTitle} />

        <main>{children}</main>
        <div></div>
      </div>
    </>
  );
};

export default SideBar;
