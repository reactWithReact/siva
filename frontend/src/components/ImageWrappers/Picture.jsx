import React from "react";
import styled from "styled-components";
const femaleImg = "https://www.w3schools.com/howto/img_avatar2.png";
const maleImg = "https://www.w3schools.com/howto/img_avatar.png";

// This component will render an image tag for the given image url
// in case no image is provided, it'll render one of two default avatars based on gender
// similarly if the url doesn't lead to an endpoint, it'll do the same thing

const Picture = ({ url, size, gender }) => {
  const src = url ? url : gender === "Male" ? maleImg : femaleImg;
  return (
    <Wrapper size={size}>
      <img
        src={src}
        alt="profilePic"
        onError={(e) =>
          (e.target.src = gender === "Male" ? maleImg : femaleImg)
        }
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  padding: 0;
  overflow: hidden;
  text-align: center;
  & img {
    width: 100%;
    border-radius: 50%;
    object-fit: fill;
    object-position: 0;
  }
`;

export default Picture;
