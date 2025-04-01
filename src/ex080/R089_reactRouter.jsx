import React from 'react';
import { Link } from 'react-router-dom';


const R089_reactRouter = () => {
  return (
    <div>
      <h1>path='/'</h1>
      <h3>R089_reactRouter</h3>
      <Link to={'/second'}>reactRouter2</Link>
    </div>
  );
};

export default R089_reactRouter;