import React, { useState, useRef, useMemo, useEffect } from "react";
import TinderCard from "react-tinder-card";
import data from "./data";
import "../Home/Card.scss";
import Info from "./Info";
import { useCookies } from "react-cookie";
import { Animated } from "react-animated-css";
import axios from "axios";

const Card = () => {
  //const [user,setUser] = useState(null);
  const [users, setUsers] = useState(data);
  const [currentIndex, setCurrentIndex] = useState(data.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const [showInfo, setShowInfo] = useState(false);
  //const [cookies, setCookie, removeCookie] = useCookies(["user"]); //backend in tuttuğu ad = user

  const currentIndexRef = useRef(currentIndex);

  // const userId = cookies.UserId;

  // const getUser = async () => { //id ile user bilgileri alındı
  //   try {
  //     const response = axios.get(url, {
  //       params: { userId },
  //     });
  //      setUser(response.data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // getOtherUsers = userId gönderip bunun harici herkesi setUser ile setle

  //   useEffect(() => {
  //     getUser()  //eşleşme güncellenince bilgileri tekrar çağırsın

  // }, [])

  // useEffect(() => {
  //     if (user) {
  //         getOtherUsers()  //user eşleşmeleri değişince diğerlerini tekrar çağırsın
  //     }
  // }, [user])

  const childRefs = useMemo(
    () =>
      Array(data.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (index) => {
    setCurrentIndex(index);
    currentIndexRef.current = index;
  };

  const canSwipe = currentIndex >= 0;

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < data.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  // const updateMatches = async (matchedUserId) => {
  //   try {
  //       await axios.put('http://localhost:8000/addmatch', {
  //           userId,
  //           matchedUserId
  //       })
  //       getUser()
  //   } catch (err) {
  //       console.log(err)
  //   }
  //}

  const onSwipe = (direction, index, swipedUserId) => {
    // if (direction === "right") {
    //   updateMatches(swipedUserId);
    // }
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const onCardLeftScreen = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  // const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)

  //   const filteredGenderedUsers = genderedUsers?.filter(genderedUser => !matchedUserIds.includes(genderedUser.user_id))
  //beğenilen kullanıcı geri gösterilmesin diye
  // filteredGenderedUsers map edilir aşağıda

  return (
    <div className="cardContainer">
      {currentIndexRef.current === -1 ? (
        <h1 style={{ color: "white", position: "relative", left: "100px" }}>
          There is nobody for your dog for now :D
        </h1>
      ) : (
        <p></p>
      )}
      <Animated animationIn="zoomIn" animationOut="zoomOut" isVisible={true}>
        <div className="cards">
          {users.map((character, index) => (
            <div className="cardsItem" key={index}>
              <TinderCard
                ref={childRefs[index]}
                className="swipe"
                preventSwipe={["up", "down"]}
                onSwipe={(dir) => onSwipe(dir, index, character.id)}
                onCardLeftScreen={() => onCardLeftScreen(character.name, index)}
              >
                <button
                  className="btn btn-light info info-animated"
                  onClick={() => {
                    setShowInfo(true);
                  }}
                >
                  i
                </button>
                <div
                  style={{ backgroundImage: `url(${character.url})` }}
                  className="card"
                >
                  <h1>{character.name}</h1>
                </div>
                <div className="showInfo">
                  {showInfo && (
                    <Info setShowInfo={setShowInfo} user={character} />
                  )}
                </div>
              </TinderCard>
            </div>
          ))}
        </div>
      </Animated>

      <div className="buttons">
        <button className="btn swipe-button" onClick={() => swipe("left")}>
          <i className="fa-solid fa-x fa-xl"></i>
        </button>
        <button className="btn swipe-button" onClick={() => swipe("right")}>
          <i className="fa-solid fa-heart fa-xl" style={{ color: "red" }}></i>
        </button>
      </div>
    </div>
  );
};

export default Card;
