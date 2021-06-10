import React from "react";
import styled, { css } from "styled-components";

interface ModalProps {
  open: boolean;
  close: () => void;
}

interface ModalContainerProps {
  active: boolean;
}

const OverlayShow = css`
  display: block;
`;

const Overlay = styled.div<ModalContainerProps>`
  ${(active) =>
    active
      ? OverlayShow
      : css`
          display: none;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 5;
          background-color: rgba(0, 0, 0, 0.4);
        `}
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 99;
  button {
    outline: none;
    cursor: pointer;
    border: 0;
  }
  section {
    width: 90%;
    max-width: 450px;
    margin: 0 auto;
    border-radius: 0.3rem;
    background-color: #fff;
    overflow: hidden;
    header {
      position: relative;
      padding: 16px 64px 16px 16px;
      background-color: #f1f1f1;
      font-weight: 700;
      button {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 30px;
        font-size: 21px;
        font-weight: 700;
        text-align: center;
        color: #999;
        background-color: transparent;
      }
    }
    main {
      padding: 16px;
      border-bottom: 1px solid #dee2e6;
      border-top: 1px solid #dee2e6;
    }
    footer {
      padding: 12px 16px;
      text-align: right;
      button {
        padding: 6px 12px;
        color: #fff;
        background-color: #6c757d;
        border-radius: 5px;
        font-size: 13px;
      }
    }
  }
`;

function Modal({ open, close }: ModalProps) {
  return (
    <Overlay active={open}>
      <ModalContainer>
        {open && (
          <section>
            <header>
              모달입니다.
              <button className="close" onClick={close}>
                {" "}
                &times;{" "}
              </button>
            </header>
            <main>모달 내용입니다.</main>
            <footer>
              <button className="close" onClick={close}>
                {" "}
                close{" "}
              </button>
            </footer>
          </section>
        )}
      </ModalContainer>
    </Overlay>
  );
}

export default Modal;
