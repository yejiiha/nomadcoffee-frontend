import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { logUserOut } from "../apollo";

interface IHeaderModalProp {
  visible: boolean;
  toggle: () => void;
  username?: string;
}

interface IRowProp {
  logOut?: boolean;
}

const ModalContainer = styled.div`
  min-width: 100px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  margin: auto;
  background-color: ${(props) => props.theme.formColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 6px;
  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  z-index: 5;
`;

const Row = styled.div<IRowProp>`
  cursor: pointer;
  display: flex;
  padding: 10px 15px;
  align-items: center;
  font-weight: 600;
  color: ${(props) => (props.logOut ? props.theme.warningColor : "inherit")};
  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
  }
`;

function HeaderModal({ visible, toggle, username }: IHeaderModalProp) {
  const history = useHistory();
  return (
    <>
      {visible && (
        <>
          <ModalContainer>
            {
              <>
                <Row>{username}'s Profile</Row>
                <Row logOut onClick={() => logUserOut(history)}>
                  Log out
                </Row>
              </>
            }
            <Row onClick={toggle}>Cancel</Row>
          </ModalContainer>
        </>
      )}
    </>
  );
}

export default HeaderModal;
