import React, { useEffect, useState } from "react";
import axios from "axios";

const useMaterias = (token) => {
  const [materias, setMaterias] = useState([]);
  const [basket, setBasket] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [updateBasket, setUpdateBasket] = useState(false);

  const fetchMatriculas = async () => {
    try {
      const {
        data: { data },
      } = await axios.get("http://localhost:1337/api/matriculas");
      setMatriculas(data);
    } catch (error) {
      console.error("se produjo un error");
    }
  };

  const fetchMaterias = async () => {
    try {
      const {
        data: { data },
      } = await axios.get("http://localhost:1337/api/materias?populate=*");
      setMaterias(data);
    } catch (error) {
      console.error("se produjo un error");
    }
  };

  //obtener el id
  useEffect(() => {
    const getBasketData = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(`http://localhost:1337/api/materias`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        setUpdateBasket(false);
        const basketData = data?.map((item) => ({
          ...item.attributes,
          basketItemId: item.id,
        }));
        setBasket(basketData);
        console.log(basketData);
      } catch (error) {
        console.log({ error });
      }
    };

    if (!!token) {
      getBasketData();
    }
  }, [token, updateBasket]);

  //Funcion eliminar
  const eliminarMateria = async ({ index, productId, basketItemId}) => {
    try {
      if (!!token) {
        await axios.delete(
          `http://localhost:1337/api/materias/${basketItemId}`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        setUpdateBasket(true);
      } else {
        const basketAfterRemovedItem = basket.filter(
          (item, idx) =>
            (item.productId !== productId && index !== idx) ||
            (item.productId === productId && index !== idx)
        );

        setBasket(basketAfterRemovedItem);
      }
    } catch (error) {
      console.log("Remove item error", { error });
    }
  };

  useEffect(() => {
    fetchMatriculas();
    fetchMaterias();
  }, []);

  return {
    matriculas,
    materias,
    eliminarMateria,
    basket,
  };
};

export default useMaterias;
