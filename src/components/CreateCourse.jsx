import { ethers } from "ethers";
import { useState } from "react";
import Web3Modal from "web3modal";

import { contractAddress, contractABI } from "../constants/config";

const CreateCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [content, setContent] = useState("");
  const [instructor, setInstructor] = useState("");
  const [price, setPrice] = useState();

  const onSubmitChangeHandler = async (e) => {
    e.preventDefault();

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    // creating a signer
    const signer = provider.getSigner();
    const LmsContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    const lmstransaction = LmsContract.createCourse(
      courseName,
      content,
      instructor,
      price
    );

    console.log(lmstransaction);
  };

  return (
    <div>
      <form onSubmit={onSubmitChangeHandler}>
        <button>Signin</button>

        <div>
          <label htmlFor="">CourseName</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="">CourseContent</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="">Instructor</label>
          <input
            type="text"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button>CreateCourse</button>
      </form>
    </div>
  );
};

export default CreateCourse;

//function createCourse(string memory _courseName, string memory _courseContent, string memory _instructor, uint _price)
