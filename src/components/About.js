import React from "react";
import {  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillContacts,
  AiFillGithub,
  AiFillMail,AiFillHeart} from "react-icons/ai"
  import {SiLeetcode} from "react-icons/si"

// import noteContext from "../context/notes/noteContext";

const About = () => {
  return (
    <>
  <div className="h2">
    This is a Full stack application Based on <label className="text-primary" > ReactJS </label> and <label className="text-primary">NodeJS</label> for backend.<p></p>
  <p>This Application can do CRUD(create,read,update,delete) operations.</p>
  <p><label className="text-primary">MongoDB</label> as database is used.</p>
  Create Your account and save your notes to get access anywhere.
  <p className="py-5" style={{fontFamily: "Montserrat", color: "teal", fontSize: "1em" }}>Contact me from the links below</p>
  
  </div>
  <div className="d-flex justify-content-center align-items-end" >
      <div className="position-absolute bottom-0 left-50 mx-auto text-center">
        <div>
          <div className="d-flex flex-row" >
          <a href="https://portfolio-six-chi-66.vercel.app/" target="_blank" rel="noreferrer"  style={{ marginRight: "10px" }}><AiFillContacts size={40} /></a>
          <a href="https://twitter.com/AdityaShitale" target="_blank" rel="noreferrer"  style={{ marginRight: "10px" }}><AiFillTwitterCircle size={40} /></a>

               <a href="https://www.linkedin.com/in/aditya-shitale-664991214/" target="_blank" rel="noreferrer" style={{ marginRight: "10px" }} ><AiFillLinkedin size={40} /></a>

               <a href="https://github.com/Aditya-Shitale" target="_blank" rel="noreferrer" style={{ marginRight: "10px" }}> <AiFillGithub size={40}/></a>

               <a href="mailto:adityashitale4@gmail.com" target="_blank" rel="noreferrer" style={{ marginRight: "10px" }}><AiFillMail size={40} /></a>
               <a href="https://leetcode.com/Adityashitale/" target="_blank" rel="noreferrer" v><SiLeetcode  size={40}/></a>
          </div>
          <AiFillHeart></AiFillHeart> Developed by adi
        </div>
      </div>
    </div>      
    </>
  
  
  )
};

export default About;
