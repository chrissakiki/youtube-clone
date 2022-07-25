import { useEffect, useState, useRef } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Wrapper } from "../assets/wrappers/Categories";
import { fetch } from "../axiosRequest";
const Categories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const slider = useRef() as React.MutableRefObject<HTMLInputElement>;

  const getCategories = async () => {
    try {
      const { data } = await fetch.get("/videos/gettags");
      setCategories(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const slideLeft = (): void => {
    slider.current.scrollLeft = slider.current.scrollLeft - 100;
  };

  const slideRight = (): void => {
    slider.current.scrollLeft = slider.current.scrollLeft + 100;
  };

  return (
    <Wrapper>
      <div className="categories-container">
        <div className="go-left" onClick={slideLeft}>
          <AiOutlineLeft />
        </div>
        <div className="categories" ref={slider}>
          {categories.map((categorie, i) => (
            <Link to={`/?query=categories/${categorie}`} key={i}>
              <span>{categorie}</span>
            </Link>
          ))}
        </div>
        <div className="go-right" onClick={slideRight}>
          <AiOutlineRight />
        </div>
      </div>
    </Wrapper>
  );
};

export default Categories;
