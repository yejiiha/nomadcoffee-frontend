import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import {
  DELETE_COFFEE_SHOP_MUTATION,
  SEE_COFFEE_SHOP,
} from "../components/Queries";
import {
  Container,
  Title,
  Form,
  Row,
  Label,
  Input,
  Column,
  PreviewImg,
  SuccessAlarm,
  CreateBtn,
} from "./AddShop";
import { EDIT_COFFEE_SHOP_MUTATION } from "../components/Queries";
import SubmitBtn from "../components/auth/SubmitBtn";
import routes from "../routes";

interface IEditCoffeeShopInput {
  name?: string;
  latitude?: string;
  longitude?: string;
  categories?: string[];
  photos?: any[];
}

type IdParams = {
  id: string;
};

const DeleteBtn = styled(SubmitBtn)`
  background-color: #f14668;
`;

function EditShop() {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [display, setDisplay] = useState(false);
  const { id } = useParams<IdParams>();
  const { data: shopData } = useQuery(SEE_COFFEE_SHOP, {
    variables: { id: Number(id) },
  });
  const [previewUrl, setPreviewUrl] = useState(
    shopData?.seeCoffeeShop?.photos[0]?.url
  );

  const { register, handleSubmit, getValues } = useForm<IEditCoffeeShopInput>({
    mode: "onChange",
    defaultValues: {
      name: shopData?.seeCoffeeShop?.name || "",
      latitude: shopData?.seeCoffeeShop?.latitude || "",
      longitude: shopData?.seeCoffeeShop?.longitude || "",
      categories: shopData?.seeCoffeeShop?.categories[0]?.name || "",
    },
  });

  const editCoffeeShopUpdate = (cache: any, result: any) => {
    const { name, latitude, longitude, categories, photos } = getValues();
    const {
      data: {
        editCoffeeShop: { ok },
      },
    } = result;

    if (!ok) {
      return;
    }

    if (ok) {
      cache.modify({
        id: `CoffeeShop:${Number(id)}`,
        fields: {
          name(prev: any) {
            return name;
          },
          latitude(prev: any) {
            return latitude;
          },
          longitude(prev: any) {
            return longitude;
          },
          categories(prev: any) {
            return categories;
          },
          photos(prev: any) {
            return photos && photos[0];
          },
        },
      });
      setDisplay(true);
      setMessage("Coffee Shop is changed.");
      setTimeout(() => {
        setDisplay(false);
      }, 2000);
    }
  };

  const [editCoffeeShopMutation, { loading }] = useMutation(
    EDIT_COFFEE_SHOP_MUTATION,
    { update: editCoffeeShopUpdate }
  );

  const onValid: SubmitHandler<IEditCoffeeShopInput> = (data) => {
    const { name, latitude, longitude, categories, photos } = data;
    editCoffeeShopMutation({
      variables: {
        id: Number(id),
        name,
        latitude,
        longitude,
        categories,
        photos: photos && photos[0]?.url,
      },
    });
  };

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

  const [deleteCoffeeShopMutation, { loading: delLoading }] = useMutation(
    DELETE_COFFEE_SHOP_MUTATION,
    {
      variables: {
        id: Number(id),
      },
      update: deleteCoffeeShopUpdate,
    }
  );

  const onDelete = () => {
    deleteCoffeeShopMutation();
    history.push(routes.home);
  };

  const onClick = () => {
    window.confirm("Are you sure you want to permanently delete Coffee Shop?")
      ? onDelete()
      : alert("Cancel");
  };

  const onPhotoChange = (e: any) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);
  };

  return (
    <>
      <PageTitle title="Edit Coffee Shop | NomadCoffee" />
      <Container>
        <Title>Edit Coffee Shop</Title>
        <Form onSubmit={handleSubmit(onValid)}>
          <Row>
            <Label>Name</Label>
            <Input
              {...register("name")}
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
              <Input
                {...register("photos")}
                type="file"
                id="photos"
                name="photos"
                onChange={onPhotoChange}
                accept="image/jpg, image/png, image/jpeg"
              />
              {previewUrl && <PreviewImg src={previewUrl} />}
            </Column>
          </Row>
          <CreateBtn
            type="submit"
            value={loading ? "Loading..." : "Edit"}
            disabled={loading}
          />
        </Form>

        <DeleteBtn
          type="submit"
          value={delLoading ? "Loading..." : "Delete"}
          onClick={onClick}
        />

        <SuccessAlarm active={display}>{message}</SuccessAlarm>
      </Container>
    </>
  );
}

export default EditShop;
