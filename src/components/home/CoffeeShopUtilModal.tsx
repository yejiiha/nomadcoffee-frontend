import React from "react";
import { useMutation } from "@apollo/client";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import routes from "../../routes";
import { DELETE_COFFEE_SHOP_MUTATION } from "../Queries";

interface IProp {
  visible: boolean;
  toggle: () => void;
  isMine: boolean;
  id?: number;
}

interface IRowProp {
  del?: boolean;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background-color: ${(props) => props.theme.formColor};
  border-radius: 12px;
  z-index: 999;
  width: 280px;
  margin: auto;
  position: relative;
`;

const Row = styled.div<IRowProp>`
  text-align: center;
  padding: 10px;
  cursor: pointer;
  font-weight: 600;
  color: ${(props) => (props.del ? props.theme.warningColor : "inherit")};
  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
  }
`;

const CoffeeShopUtilModal = ({ visible, toggle, isMine, id }: IProp) => {
  const history = useHistory();

  const deleteCoffeeShopUpdate = (cache: any, result: any) => {
    const {
      data: {
        deleteCoffeeShop: { ok },
      },
    } = result;

    if (ok) {
      cache.evict({ id: `CoffeeShop:${Number(id)}` });
    }
  };

  const [deleteCoffeeShopMutation] = useMutation(DELETE_COFFEE_SHOP_MUTATION, {
    variables: {
      id: Number(id),
    },
    update: deleteCoffeeShopUpdate,
  });

  const onDelete = () => {
    deleteCoffeeShopMutation();
    history.push(routes.home);
  };

  const onClick = () => {
    window.confirm("Are you sure you want to permanently delete Coffee Shop?")
      ? onDelete()
      : alert("Cancel");
  };
  return (
    <>
      {visible && (
        <>
          <ModalWrapper>
            <ModalContainer>
              <Row>
                <Link to={`/coffeeshop/${id}`}>Go to Coffee Shop</Link>
              </Row>
              {isMine && (
                <>
                  <Row>
                    <Link to={`/shop/${id}`}>Edit</Link>
                  </Row>
                  <Row del onClick={onClick}>
                    Delete
                  </Row>
                </>
              )}
              <Row onClick={toggle}>Cancel</Row>
            </ModalContainer>
          </ModalWrapper>
          <Overlay />
        </>
      )}
    </>
  );
};

export default CoffeeShopUtilModal;
