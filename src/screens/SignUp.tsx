import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import ErrorMessage from "../components/auth/ErrorMessage";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import SubmitBtn from "../components/auth/SubmitBtn";
import Title from "../components/auth/Title";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
import routes from "../routes";

interface ISignUpInput {
  email: string;
  username: string;
  password: string;
  name: string;
  location: string;
  avatarUrl?: string;
  githubUsername?: string;
  createAccountError: string;
}

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $name: String!
    $location: String!
    $password: String!
    $avatarUrl: String
    $githubUsername: String!
  ) {
    createAccount(
      username: $username
      email: $email
      name: $name
      location: $location
      password: $password
      avatarUrl: $avatarUrl
      githubUsername: $githubUsername
    ) {
      ok
      error
    }
  }
`;

const Text = styled(FatLink)`
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  margin: 0 20px 10px;
  text-align: center;
`;

function SignUp() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    clearErrors,
  } = useForm<ISignUpInput>({ mode: "onChange" });

  const onCompleted = (data: any) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError("createAccountError", { message: error });
    }
    history.push(routes.home, {
      message: "Your account is created! Please log in 😀",
      username,
      password,
    });
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const onValid: SubmitHandler<ISignUpInput> = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="SignUp | NomadCoffee" />
      <FormBox>
        <Title />
        <form onSubmit={handleSubmit(onValid)}>
          <Text>Sign up to go and find the best caffes to work 💻</Text>
          <Input
            {...register("username", {
              required: "Username is required.",
              minLength: {
                value: 3,
                message: "Username should be longer than 3 chars.",
              },
            })}
            type="text"
            placeholder="Username"
            name="username"
            hasError={Boolean(errors.username?.message)}
            onFocus={() => clearErrors()}
          />
          <ErrorMessage message={errors?.username?.message} />
          <Input
            {...register("email", { required: "Email is required." })}
            type="text"
            placeholder="Email"
            name="email"
            hasError={Boolean(errors.email?.message)}
            onFocus={() => clearErrors()}
          />
          <ErrorMessage message={errors?.email?.message} />
          <Input
            {...register("name", { required: "Name is required." })}
            type="text"
            placeholder="Name"
            name="name"
            hasError={Boolean(errors.name?.message)}
            onFocus={() => clearErrors()}
          />
          <ErrorMessage message={errors?.name?.message} />
          <Input
            {...register("location", { required: "Location is required." })}
            type="text"
            placeholder="Location"
            name="location"
            hasError={Boolean(errors.location?.message)}
            onFocus={() => clearErrors()}
          />
          <ErrorMessage message={errors?.location?.message} />
          <Input
            {...register("password", { required: "Password is required." })}
            type="password"
            placeholder="Password"
            name="password"
            hasError={Boolean(errors.password?.message)}
            onFocus={() => clearErrors()}
          />
          <ErrorMessage message={errors?.password?.message} />
          <Input
            {...register("avatarUrl")}
            type="text"
            placeholder="AvatarUrl"
            name="avatarUrl"
            hasError={Boolean(errors.avatarUrl?.message)}
            onFocus={() => clearErrors()}
          />
          <Input
            {...register("githubUsername")}
            type="text"
            placeholder="GithubUsername"
            name="githubUsername"
            hasError={Boolean(errors.githubUsername?.message)}
            onFocus={() => clearErrors()}
          />

          <SubmitBtn
            type="submit"
            value={loading ? "Loading..." : "Sign Up"}
            disabled={!isValid || loading}
          />
          <ErrorMessage message={errors?.createAccountError?.message} />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
    </AuthLayout>
  );
}

export default SignUp;
