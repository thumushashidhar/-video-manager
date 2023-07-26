import React from "react";
import { HiLogout } from "react-icons/hi";
import axios from "axios";
import { useState, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";
import "../App.css";
const Card = (props) => {
  const [cardinput, setCardInput] = useState({
    title: "",
    video_link: "",
 
    buckedId: "",
  });
  const [card, setCard] = useState(null);
  const [editcard, setEditcard] = useState(null);
  const [bucket, setBucket] = useState(null);
  const [isloading, setLoading] = useState(true);

  const handleDelete = async (id) => {
    try {
      console.log(`http://localhost:8000/cards/${id}`);
      await axios.delete(`http://localhost:8000/cards/${id}`);
      setCard(card.filter((b) => b.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const onEditCardSubmit = (event) => {
    event.preventDefault();
    const handleEdit = async () => {
      return await axios.put(`http://localhost:8000/cards/${editcard.id}`, {
        title: cardinput.title,
        video_link: cardinput.video_link,
   
        buckedId: props.buckId,
        cardId: editcard.cardId,
      });
    };
    handleEdit();
    setEditcard(null);
    setCardInput({
      title: "",
      video_link: "",

      
      buckedId: "",
    });
    setLoading(!isloading);
  };



  const onInputSubmit = (event) => {
    event.preventDefault();
    if (!editcard) {
      const postBucket = async () => {
        axios.post(`http://localhost:8000/cards/`, {
          title: cardinput.title,
          video_link: cardinput.video_link,
  
          buckedId: props.buckId,
          id: uuidV4(),
          checked: false,
        });
      };
      postBucket();
      setCardInput({
        title: "",
        video_link: "",
    
      });
      setLoading(!isloading);
    } else {
      const handleEdit = async (id) => {
        return await axios.put(`http://localhost:8000/buckets/${id}`, {
          title: cardinput,
          id: id,
        });
      };
      handleEdit();
      setCardInput({
        title: "",
        video_link: "",
    
      });
    }
  };


  useEffect(() => {
    axios
      .get("http://localhost:8000/buckets")
      .then((res) => {
        setBucket(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setLoading, props.isloading]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/cards")
      .then((res) => {
        let filcards = res.data.filter(function (e) {
          return e.buckedId === props.buckId;
        });

        setCard(filcards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.buckId, isloading]);

  const handleMove = (buck, car, event) => {
    setLoading(!isloading);
    event.preventDefault();
    const handleEdit = async () => {
      return await axios.put(`http://localhost:8000/cards/${car.id}`, {
        title: car.title,
        video_link: car.video_link,
   
        buckedId: buck.id,
        id: car.id,
        checked: car.checked,
      });
    };
    handleEdit();
    setLoading(!isloading);
    console.log(buck.id, car.id);
  };
  const cardHandleClick = (event) => {
    event.preventDefault();
    if (!editcard) {
      setCard([...card, { id: uuidV4(), title: cardinput }]);
      setCardInput({
        title: "",
        video_link: "",
     
      });
    } 
  };
  var History = []
  const makeHistory = (car) =>
  {
    let now = new Date()
    
    const postHistry = async () =>
    {
      await axios.post("http://localhost:8000/history", {
        "title": car.title,
        "link": car.video_link,
        "time": now
      });
    }
    postHistry();  
    
  

    console.log(History)
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setCardInput((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }
  const handleDeleteChecked = () => {
    var deleteIds = [];
    for (var i = 0; i < card.length; i++) {
      if (card[i].checked === true) {
        deleteIds.push(card[i].id);
      }
    }
    console.log(deleteIds);

    for (i = 0; i < deleteIds.length; i++)
    {
      
      console.log(`http://localhost:8000/cards/${deleteIds[i]}`);
      axios
        .delete(`http://localhost:8000/cards/${deleteIds[i]}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      setLoading(!isloading);
    }
    
    
  };
  console.log(props.buckId)
  return (
    <>
      <div className="card-main">
        <div className="top-buttons">
          <button
            type="button"
            class="btn btn-light"
            data-bs-toggle="modal"
            data-bs-target="#addCard"
          >
            Add Card
          </button>
          <div className="Title">{props.title }</div>
          <button class="btn btn-primary" onClick={handleDeleteChecked}>
            Delete Checked
          </button>
        </div>

        <div class="container text-center">
          <form onSubmit={onInputSubmit}>
            <div
              class="modal fade"
              id="addCard"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h2 className="modal-header-title">Enter Card</h2>
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
                        name="title"
                        placeholder="Enter Card title"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        value={cardinput.title}
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        name="video_link"
                        class="form-control"
                        placeholder="Enter Video link"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        value={cardinput.video_link}
                        required
                        onChange={handleChange}
                      />
                    </div>
                    {/* <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        name="bucketlocation"
                        placeholder="Enter Bucket Name"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        value={cardinput.bucketlocation}
                        required
                        onChange={handleChange}
                      />
                    </div> */}
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      class="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Add Card
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <form onSubmit={onEditCardSubmit}>
            <div
              class="modal fade"
              id="editCardModel"
              tabindex="-1"
              aria-labelledby="editCardModel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h2 className="modal-header-title">Update Card Details</h2>
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
                        name="title"
                        placeholder="Enter Card title"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        value={cardinput.title}
                        onChange={handleChange}
                      />
                    </div>
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        name="video_link"
                        class="form-control"
                        placeholder="Enter Video title"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        value={cardinput.video_link}
                        required
                        onChange={handleChange}
                      />
                    </div>
                    {/* <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        name="bucketlocation"
                        placeholder="Enter Bucket Name"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        value={cardinput.bucketlocation}
                        required
                        onChange={handleChange}
                      />
                    </div> */}
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      class="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Update Card
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div class="row">
          {card &&
            card.map((car, index) => {
              return (
                <div class="col-sm-4 mb-3 mb-sm-0 card-contents">
                  <div class="card">
                    <div class="card-body">
                      <div className="card-header">
                        <h5 class="card-title" style={{ color: "white" }}>
                          {car.title}
                        </h5>
                        <div class="btn-group dropend">
                          <button
                            type="button"
                            class="btn btn-light dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Move To
                          </button>
                          <ul class="dropdown-menu">
                            {bucket.map((buck, index) => {
                              return (
                                <li>
                                  <button
                                    class="dropdown-item"
                                    onClick={(e) => handleMove(buck, car, e)}
                                  >
                                    {buck.title}
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                          onChange={() => {
                            car.checked = !car.checked;
                            console.log(card);
                          }}
                        />
                      </div>

                      <p class="card-text">{car.video_link}</p>

                      <div
                        class="modal fade"
                        id="Video"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-dialog-centered">
                          <div class="modal-content ">
                            <div class="modal-header">
                              <h1
                                class="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                {car.title}
                              </h1>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body">
                              <div class="ratio ratio-16x9">
                                <iframe
                                  src={car.video_link}
                                  title="YouTube video"
                                  allowfullscreen
                                ></iframe>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="modal fade"
                        id="exampleModalCenter"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalCenterTitle"
                        aria-hidden="true"
                      >
                        <div
                          class="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5
                                class="modal-title"
                                id="exampleModalLongTitle"
                              >
                                Modal title
                              </h5>
                              <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">...</div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                              <button type="button" class="btn btn-primary">
                                Save changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-bottom-buttons">
                        <button
                          type="button"
                          class="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#Video"
                          onClick={() => {
                            makeHistory(car);
                          }}
                        >
                          Play Video
                        </button>
                        <button
                          class="btn btn-primary"
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#editCardModel"
                          onClick={() => {
                            setEditcard(car);
                            setCardInput({
                              title: car.title,
                              video_link: car.video_link,
                         
                              buckedId: car.buckedId,
                            });
                          }}
                        >
                          Edit Card
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={() => {
                            handleDelete(car.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Card;
