import "../App.css";
import { useEffect, useState } from "react";
import Button from "../component/button";
import axios from "axios";
import CardMui from "../component/card_Mui";
import NavbarMui from "../component/navbarMui";
import ModalMUI from "../component/modal_mui";
import { useDispatch, useSelector } from "react-redux";
import { comp_function } from "../store/componentReducer";
import { fetchProduct } from "../store/productReducer";
import { address } from "../routes";

const Home = () => {
  const [productValue, setProductValue] = useState();
  const [product, setProduct] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [inputValueImage, setInputValueImage] = useState();
  const [inputValueTitle, setInputValueTitle] = useState();
  const [inputValuePrice, setInputValuePrice] = useState();
  const [updateValue, setUpdateValue] = useState();
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const modalSelector = useSelector((state) => state.comp_func_reducer);
  const modalSelectorEdit = useSelector((state) => state.comp_func_reducer);

  // const { status, data } = useSelector((state) => state.data)  const productSelector = useSelector((state) => state.productReducer);

  const addProduct = () => {
    const newProduct = {
      imageAddress: modalSelector.value.payload.imageAddress,
      title: modalSelector.value.payload.title,
      price: modalSelector.value.payload.price,
    };
    // setProduct([...product, newProduct]);
    const check = axios(`${address}product`, newProduct);
    console.log("check=>", check);
    console.log("newProduct=>", addProduct);
  };
  const updateProduct = () => {
    const newProduct = {
      imageAddress: modalSelector.value.payload.imageAddress,
      title: modalSelector.value.payload.title,
      price: modalSelector.value.payload.price,
      id: "63973560e87a54b69a71bc8a",
    };
    // setProduct([...product, newProduct]);
    const updateCheck = axios.post(
      "http://localhost:5000/api/product",
      newProduct
    );
    console.log("updateCheck=>", updateCheck);
    console.log("newProduct=>", addProduct);
  };
  // useEffect(() => {
  //   dispatch(fetchProduct());
  // });

  const checkFunc = () => {
    modalSelector.value.payload
      ? console.log("use effect selector=>", modalSelector.value.payload)
      : console.log("annas");
  };

  useEffect(() => {
    console.log("use effect selector=>", modalSelector.value.payload);
    {
      refresh ? addProduct() : setProduct();
    }
  }, [modalSelector]);
  useEffect(() => {
    console.log("use effect selector=>", modalSelector.value.payload);
    {
      refresh
        ? setProduct([
            ...product,
            {
              imageAddress: modalSelector.value.payload.imageAddress,
              title: modalSelector.value.payload.title,
              price: modalSelector.value.payload.price,
            },
          ])
        : setProduct([...product]);
    }
  }, [modalSelector]);

  const getData = async () => {
    await dispatch(fetchProduct());
  };

  useEffect(() => {
    getData(); // error
    // console.log(checkData);
    console.log(productSelector.data);
    // console.log(data);
  }, [refresh]);

  // {
  //   if (status === "loading") {
  //     return (
  //       <>
  //         <h1>LOADING...</h1>;
  //       </>
  //     );
  //   }
  // }
  // const { imageAddress, title, price } = modalSelector;

  // const updateProduct = () => {
  // const newProduct = {
  //   imageAddress: modalSelector.value.payload.imageAddress,
  //   title: modalSelector.value.payload.title,
  //   price: modalSelector.value.payload.price,
  // };
  // // setProduct([...product, newProduct]);
  // const check = axios.put("http://localhost:5000/api/put/product", newProduct);
  // console.log("check=>", check);
  // console.log("newProduct=>", addProduct);
  // };

  // const addproduct = async () => {
  //   setProduct([
  //     ...product,
  //     {
  //       imageAddress: inputValueImage,
  //       title: inputValueTitle,
  //       price: inputValuePrice,
  //       handle: true,
  //     },
  //   ]);

  // const deleteproduct = async (index) => {
  //   product.splice(index, 1);
  //   setProduct([...product]);
  // };

  // const editproduct = (index) => {
  //   product[index].handle = false;
  //   setProduct([...product]);
  // };

  // const updateproduct = (index) => {
  //   product[index].name = updateValue;
  //   product[index].handle = true;
  //   setProduct([...product]);
  // };

  return (
    <>
      <h1>My app</h1>
      <button onClick={checkFunc}>checking</button>
      <button
        onClick={() => {
          console.log(productSelector.data);
          // getData();
          setRefresh(true);
          setProduct([...productSelector.data]);
          console.log(productSelector.data);
        }}
      >
        selector button
      </button>
      <NavbarMui />

      <div className="main">
        <section>
          {product?.map((v, i) => {
            return (
              <CardMui
                key={i}
                imageAddress={v.imageAddress}
                title={v.title}
                price={v.price}
                id={v._id}
              />
            );
          })}
        </section>
      </div>
    </>
  );
};

export default Home;
