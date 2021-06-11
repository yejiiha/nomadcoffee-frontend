import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled, { css } from "styled-components";
import SubmitBtn from "../components/auth/SubmitBtn";
import PageTitle from "../components/PageTitle";
import routes from "../routes";
import { CREATE_COFFEE_SHOP_MUTATION } from "../components/Queries";

interface ICreateCoffeeShopInput {
  name: string;
  latitude?: string;
  longitude?: string;
  categories?: string[];
  photos?: string;
}

type SuccessAlarmProps = {
  active: boolean;
};

export type ContainerProps = {
  previewUrl?: boolean;
};

export const Container = styled.div<ContainerProps>`
  background-color: ${(props) => props.theme.formColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 16px;
  height: ${(props) => (props.previewUrl ? "100vh" : "65vh")};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 30px;
  margin: 80px 0 40px 0;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const Label = styled.span`
  position: relative;
  font-size: 15px;
  font-weight: 600;
  width: 20%;
  padding: 0 15%;
  text-align: left;
  flex: 0 0 194px;
`;

export const Input = styled.input`
  width: 30%;
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 5px 10px;
  border-radius: 4px;
  &:focus {
    border-color: ${(props) => props.theme.fontColor};
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CreateBtn = styled(SubmitBtn)`
  width: 50%;
  padding: 20px 10px;
  margin: 120px 25% 0 25%;
`;

export const PreviewImg = styled.img`
  margin-top: 20px;
  height: 300px;
  width: 300px;
  border-radius: 8px;
`;

export const SuccessAlarmShow = css`
  display: block;
  bottom: 0;
`;

export const SuccessAlarm = styled.div<SuccessAlarmProps>`
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 20px;
  background-color: black;
  color: white;
  display: none;
  transition: all 0.3s ease-out;
  ${({ active }) => (active ? SuccessAlarmShow : "")};
`;

function AddShop() {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [display, setDisplay] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<ICreateCoffeeShopInput>({
    mode: "onChange",
  });

  const createCoffeeShopUpdate = (cache: any, result: any) => {
    const {
      data: { createCoffeeShop },
    } = result;
    if (createCoffeeShop.ok) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeCoffeeShops(prev: any) {
            return [createCoffeeShop, ...prev];
          },
        },
      });
      history.push(routes.home);
    }
  };

  const [createCoffeeShopMutation, { loading }] = useMutation(
    CREATE_COFFEE_SHOP_MUTATION,
    { update: createCoffeeShopUpdate }
  );

  const onPhotoChange = (e: any) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);
  };

  const onValid: SubmitHandler<ICreateCoffeeShopInput> = (data) => {
    const { name, latitude, longitude, categories, photos } = data;
    createCoffeeShopMutation({
      variables: {
        name,
        latitude,
        longitude,
        categories,
        photos: photos && photos[0],
      },
    });
    setDisplay(true);
    setMessage("Coffee Shop is created.");
    setTimeout(() => {
      setDisplay(false);
    }, 2000);
  };
  return (
    <>
      <PageTitle title="Create Coffee Shop | NomadCoffee" />
      <Container previewUrl={Boolean(previewUrl)}>
        <Title>Create Coffee Shop</Title>
        <Form onSubmit={handleSubmit(onValid)}>
          <Row>
            <Label>Name</Label>
            <Input
              {...register("name", { required: "Name is required." })}
              type="text"
              placeholder="Coffee Shop Name"
            />
          </Row>

          <Row>
            <Label>Position</Label>
            <Input
              {...register("latitude")}
              type="text"
              placeholder="Latitude"
              style={{ marginRight: 10 }}
            />
            <Input
              {...register("longitude")}
              type="text"
              placeholder="Longitude"
            />
          </Row>
          <Row>
            <Label>Category</Label>
            <Input
              {...register("categories")}
              type="text"
              placeholder="Category"
            />
          </Row>

          <Row>
            <Label>Photo</Label>
            <Column>
              {/* <PhotoLabel htmlFor="photos">Choose photo</PhotoLabel> */}
              <Input
                {...register("photos")}
                type="file"
                id="photos"
                name="photos"
                // style={{ display: "none" }}
                onChange={onPhotoChange}
                accept="image/jpg, image/png, image/jpeg"
              />
              {previewUrl && <PreviewImg src={previewUrl} />}
            </Column>
          </Row>
          <CreateBtn
            type="submit"
            value={loading ? "Loading..." : "Create"}
            disabled={!isValid || loading}
          />
        </Form>
        <SuccessAlarm active={display}>{message}</SuccessAlarm>
      </Container>
    </>
  );
}

export default AddShop;
