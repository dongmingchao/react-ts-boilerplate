import React from 'react';
import NoteBook from "../../components/notebook";
import { Link } from 'react-router-dom';
import './Home.css';

export interface HelloProps {
  compiler: string;
  framework: string;
}

export default function Home() {
  return (
    <div>
      <h1 className="header" >Home</h1>
      <NoteBook />
    </div>
  );
}
