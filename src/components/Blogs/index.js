import axios from "axios";
import React, { useEffect, useState } from "react";
// b918a4a88b91461cbb5923734af9c509
const API_KEY = "b918a4a88b91461cbb5923734af9c509";
const query = "Chronic Obstructive Pulmonary Disease";
const api_url = `https://newsapi.org/v2/everything?q=${query}&from=2022-11-15&sortBy=popularity&apiKey=${API_KEY}`;

const Blogs = () => {
  const [blogData, setBlogData] = useState([]);
  useEffect(() => {
    getBlogData();
  }, []);

  const getBlogData = async () => {
    const response = await axios.get(api_url);
    setBlogData(response.data.articles.slice(0, 5));
    console.log(response.data.articles.slice(0, 5));
  };
  return (
    <div className="mt-4">
      <h1 className="text-2xl font-semibold text-[#1678F2]">Blogs</h1>
      <div className="flex mt-4">
        {blogData.map((blog) => (
          <a
            key={blog.url}
            className="max-w-[250px] mr-4 shadow shadow-slate-400 rounded-lg"
            href={blog.url}
            target="_blank"
          >
            <img className="max-w-[250px] rounded-lg" src={blog.urlToImage} />
            <h1 className="p-4 font-bold ">{blog.title}</h1>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
